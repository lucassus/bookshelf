#!/bin/bash
find ./src/interfaces/graphql -type f -name "*.graphql" -exec cp {} ./dist/{} \;
