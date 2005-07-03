#!/bin/zsh

echo "THIS MUST BE RAN FROM CURRENT DIRECTORY"
sleep 2

rm -f dlembed.xpi
rm -fr build
mkdir build
cd build
rsync -avr --exclude ".svn/" ../src/ .
find . | grep -v '/\.' | zip -9 -@ ../dlembed.xpi

