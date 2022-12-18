#!/bin/bash

echo "=========== SRC ==========="

echo "ts/tsx"
find ./src -type f \( -iname \*.ts -o -iname \*.tsx \) | wc -l

echo "js/jsx"
find ./src -type f \( -iname \*.js -o -iname \*.jsx \) | wc -l

echo "@ts-ignore"
grep -R "@ts-ignore" ./src --exclude-dir=node_modules | wc -l

echo "@ts-nocheck"
grep -R "@ts-nocheck" ./src --exclude-dir=node_modules | wc -l