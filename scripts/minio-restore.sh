#!/bin/bash
set -e
SCRIPT_PATH=$(dirname "$0")
echo "Restoring minio files"
cd $SCRIPT_PATH/../.devcontainer/minio-dump
minio-cli mb --ignore-existing myminio/test-bucket
minio-cli rm --recursive --force myminio/test-bucket || true
minio-cli cp --recursive . myminio