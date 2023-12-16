#!/usr/bin/env bash

DBFILE="new_bikr.db"
JSONFILES="data/bike-routes/*"
THISFILENAME=$(basename "$0") # Get file name
for JSON in $JSONFILES; do
    trip=$(jq '{ city: .city, trips: .trips[].coords }' "$JSON")
    echo "$trip"
done
# Check the exit status
if [ $? -eq 0 ]; then
    
    echo "$THISFILENAME executed successfully."
else
    echo "$THISFILENAME encountered an error."
fi
