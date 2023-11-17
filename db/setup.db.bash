#!/usr/bin/env bash
touch bikr.db
sqlite3 bikr.db < sql/setup.sql
echo "SQlite setup script completed."