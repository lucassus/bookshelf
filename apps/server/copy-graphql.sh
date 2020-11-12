#!/bin/bash
cd src && find interfaces/graphql -type f -name "*.graphql" -exec cp {} ../dist/{} \;
