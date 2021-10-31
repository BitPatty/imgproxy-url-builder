#!/bin/bash
set -e
SCRIPT_PATH=$(dirname "$0")
echo "Dumping minio files"
cd $SCRIPT_PATH/..
minio-cli cp --recursive myminio ./.devcontainer/minio-dump