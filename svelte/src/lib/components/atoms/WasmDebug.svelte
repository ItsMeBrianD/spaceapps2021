<script lang="ts">
  import {ContextKeys} from "$lib/utils/constants";
  import {getContext} from "svelte";

  const wasm = getContext(ContextKeys.WasmStore).wasmMod;

  async function render() {
    const tles = await fetch("/norad/catalog_bigboi.txt").then(async r => r.text());

    let enc = new TextEncoder();
    let tleArray = enc.encode(tles);

    console.log(wasm);

    let dataPtr = wasm._malloc(tleArray.length);
    let dataHeap = new Uint8Array(wasm.HEAPU8.buffer, dataPtr, tleArray.length);
    dataHeap.set(tleArray);

    let start = new Date();
    wasm.loadObjs(dataPtr, tleArray.length);
    let end = new Date();
    let elapsed = end.getTime() - start.getTime();
    console.log(`LOAD: ${elapsed}ms`);

    for (let i = 0; i < 5; i++) {
      start = new Date();
      let retVector = wasm.getPositions();
      end = new Date();
      elapsed = end.getTime() - start.getTime();
      console.log(`CALC: ${elapsed}ms to calculate ${retVector.size()} positions`);
      // for (let i = 0; i < retVector.size(); i++) {
      //   let info = retVector.get(i);
      //   console.log(`${info.get(0)}\t${info.get(1)}\t${info.get(2)}\t${info.get(3)}`);
      // }
      retVector.delete();
    }

  }

  render();
  
</script>

<p>
  {wasm.hello()}
</p>