#!/bin/bash
find ./src/graphql -type f -name "*.graphql" -exec cp {} ./dist/{} \;
