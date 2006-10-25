#!/bin/zsh

echo "THIS MUST BE RAN FROM CURRENT DIRECTORY"
sleep 2

rm -f dlembed.xpi
rsync -avr --exclude ".svn/" --delete src/ build/

cd build
find . | grep -v '/\.' | zip -9 -@ ../dlembed.xpi

