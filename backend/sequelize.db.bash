#!/usr/bin/env bash

DBMODELS="./orm/db-models"
THISFILENAME=$(basename "$0") # Get file name

if [ -d "$DBMODELS" ]; then
    rm -r "$DBMODELS"
    echo "Folder removed."
fi

# Auto generate models from bikr.db for sequelize ( using sequelize-auto )
node node_modules/sequelize-auto/bin/sequelize-auto -o "$DBMODELS" -d ../db/bikr.db -e sqlite
chmod 777 $DBMODELS
chmod 777 $DBMODELS/*.js

if [ $? -eq 0 ]; then
    echo "$THISFILENAME executed successfully."
else
    echo "$THISFILENAME encountered an error."
fi