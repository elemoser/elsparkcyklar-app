#!/usr/bin/env bash

# This file is executed in setup.db.bash but it is capable of being executed on its own.
# The purpose of this script is to reformat json data generated using TripGenerator https://github.com/JuliaLind/TripGenerator-extended
# to a insert sql query for each trip object for easy access in the db.

TRIPS_JSONFILE="./data/bike-routes/bike-sim-routes.json"
DATABASE="./bikr.db"
DB_TABLE="simulate"
THISFILENAME=$(basename "$0") # Get file name

# Read the content of the JSON with jq
json=$(jq '.[]' "$TRIPS_JSONFILE")

# Loop through each object in the JSON array
for trip in $(echo "$json" | jq -c '.'); do

        # Insert data into simulate table
        city_id=$(echo "$trip" | jq -r '.city')
        trip=$(echo "$trip" | jq -r '.trips')
    sqlite3 $DATABASE <<EOF
    INSERT INTO $DB_TABLE (city_id, bike_route) VALUES (
        "$city_id",
        "$trip"
    );
EOF
done

# Check the exit status
if [ $? -eq 0 ]; then
    
    echo "$THISFILENAME executed successfully."
else
    echo "$THISFILENAME encountered an error."
fi
