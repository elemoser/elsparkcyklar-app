#!/usr/bin/env bash

DBFILE="new_bikr.db"
DATAFOLDER="data"
THISFILENAME=$(basename "$0") # Get file name

# Remove any existing db of the same name
rm -f $DBFILE

# GEODATA
CITIES=(Stockholm Göteborg Malmö Uppsala Linköping)
IDS=(R398021 R935611 R10663667 R305455 R935467)

# Create and populate a new database named bikr.db
touch $DBFILE
chmod 777 $DBFILE
sqlite3 $DBFILE < sql/create-tables.sql

# Create the data folder for the <city>.json backupfiles.
mkdir -p $DATAFOLDER

# Create city table with nominatim data
index=1
for i in "${!IDS[@]}"
do 
    name=${CITIES[$i]}
    id=${IDS[$i]}
    data=$(curl -s "https://nominatim.openstreetmap.org/lookup?osm_ids=$id&polygon_geojson=1&format=json")
    if [ "$(echo "$data" | jq -e '. == []')" = "true" ]; then
        echo "Error: Something went wrong with the nominatim API."
        rm -f $DBFILE
        exit 1
    else
        echo "$data" > "$DATAFOLDER/$name.json"
        bounds=$(jq -cr '.[0].geojson.coordinates' "$DATAFOLDER/$name.json")
        sqlite3 $DBFILE "INSERT INTO city(id, name, bounds) VALUES($index,'$name','$bounds');"
    fi
    ((index=index+1))
done

# Import rest of data dependent on CSV data above
sqlite3 $DBFILE < sql/mock-data.sql

sqlite3 $DBFILE "SELECT * FROM city;"

# Remove old bikr.db
rm -f bikr.db
# Rename newly created db to bikr.db
mv $DBFILE bikr.db

# Check the exit status
if [ $? -eq 0 ]; then
    
    echo "$THISFILENAME executed successfully."
else
    echo "$THISFILENAME encountered an error."
fi
