#!/bin/bash

# Init minio
minio-cli alias set myminio/ http://localhost:9000 minio_user minio_password

# Init project
nvm install
nvm use
nvm alias  default $(node --version)
nvm install-latest-npm
npm i
