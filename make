#!/bin/zsh

echo "THIS MUST BE RAN FROM CURRENT DIRECTORY"

rm -f dlembed.xpi
rm -fr build
mkdir build
cd build
mkdir chrome
( cd ../src/chrome ; zip -9 -r ../../build/chrome/dlembed.jar . )
cp ../src/*.* . 
zip -9 -r ../dlembed.xpi .
cd .. ; rm -fr build

