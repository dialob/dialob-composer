#!/usr/bin/env bash

SRC_FILE=./src
PUBLIC_FILE=./public
INDEX_FILE=./src/index.tsx
TS_FILE=./src/react-app-env.d.ts

if [[ -f "$INDEX_FILE" ]]; then
  echo "Demo start up exists, delete: '$INDEX_FILE' if you want them to be recreated"
  read -p "Press [Enter] to continue"
else
  echo "Preparing demo-envir sources"
  echo "Coping start files from './build-scripts/demo' to:"
  echo " - '$INDEX_FILE'"
  echo " - '$PUBLIC_FILE'"
  echo " - '$TS_FILE'"
  
  read -p "Press [Enter] to continue" 


if [ -d "$SRC_FILE" ]; then
  echo "Removing '$SRC_FILE'"
  rm -r $SRC_FILE
fi

mkdir $SRC_FILE
cp ./build-scripts/demo/index.tsx $INDEX_FILE
cp ./build-scripts/demo/react-app-env.d.ts $TS_FILE

if [ -d "$PUBLIC_FILE" ]; then
  echo "Removing '$PUBLIC_FILE'"
  rm -r $PUBLIC_FILE
fi

echo "Creating '$PUBLIC_FILE'"
mkdir $PUBLIC_FILE
cp -R ./build-scripts/demo/public/* $PUBLIC_FILE

fi
