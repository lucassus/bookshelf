#!/bin/bash

yarn graphql codegen

GIT_STATUS=$(git status --short)

if [[ -z ${GIT_STATUS} ]]
then
  exit 0
else
  echo ${GIT_STATUS}
  exit 1
fi
