#!/usr/bin/env bash

DBFILE="bikr.db"

# Remove any existing db named bikr.db
if [[ -f $DBFILE ]]; then
    rm -f bikr.db
fi

# Create and populate a new database named bikr.db
touch bikr.db
sqlite3 bikr.db < sql/setup.sql

# Check the exit status
if [ $? -eq 0 ]; then
    echo "setup.db.bash executed successfully."
else
    echo "setup.db.bash encountered an error."
fi