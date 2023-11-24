#!/usr/bin/env bash

DBFILE="bikr.db"
THISFILENAME=$(basename "$0") # Get file name

# Remove any existing db named bikr.db
if [[ -f $DBFILE ]]; then
    rm -f $DBFILE
fi

# Create and populate a new database named bikr.db
touch $DBFILE
sqlite3 $DBFILE < sql/create-tables.sql
sqlite3 $DBFILE < sql/mock-data.sql

# Check the exit status
if [ $? -eq 0 ]; then
    echo "$THISFILENAME executed successfully."
else
    echo "$THISFILENAME encountered an error."
fi
