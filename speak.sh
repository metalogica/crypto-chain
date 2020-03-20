#!/bin/zsh

message=$1
cd $CODE/crypto-chain
echo 'test-' >> test.txt
git add .
git commit -m "${message}"
git push
echo "successfully pushed to git with following message: ${message}"