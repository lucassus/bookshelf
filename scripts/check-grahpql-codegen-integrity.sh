#!/bin/bash

yarn graphql codegen

if [[ -z $(git status -s) ]]
then
  exit 0
else
  git status
  exit 1
fi
