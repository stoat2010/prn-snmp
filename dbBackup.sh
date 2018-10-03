#!/bin/bash
mongodump -d prn002 --gzip --out ~/Backups/$(date +"%Y.%m.%d") -d prn002
