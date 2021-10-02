#!/bin/bash
# Build the Wasm
em++ src/main.cpp src/libastro/*.c -o ../svelte/src/lib/wasm/wasm.js -w -s WASM=1 --bind -O1 -std=c++11 --pre-js=pre.js --post-js=post.js -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap","allocate"]'
# Put the wasm file into the static directory so we can load it
mv ../svelte/src/lib/wasm/wasm.wasm ../svelte/static/wasm.wasm;
# Export Module so we can actually use it
#sed "s/var Module = typeof Module !== 'undefined' ? Module : {};/export var Module = typeof Module !== 'undefined' ? Module : {};/g" ../svelte/src/lib/wasm/wasm.js -i;

echo "Built!";