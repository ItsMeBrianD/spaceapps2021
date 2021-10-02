<script lang="ts">
  import {ContextKeys} from "$lib/utils/constants";
  import {getContext} from "svelte";

  const wasm = getContext(ContextKeys.WasmStore).wasmMod;

  async function render() {
    const tles = await fetch("/norad/catalog.txt").then(async r => r.text());

    let enc = new TextEncoder();
    let tleArray = enc.encode(tles);

    let dataPtr = wasm._malloc(tleArray.length);
    let dataHeap = new Uint8Array(wasm.HEAPU8.buffer, dataPtr, tleArray.length);
    dataHeap.set(tleArray);


    const start = new Date();
    let retVector = wasm.getPositions(dataPtr, tleArray.length);
    const end = new Date();

    console.log("elapsed", end.getTime() - start.getTime());

    console.log(retVector);
    console.log(retVector.size());

    // for (let i = 0; i < retVector.size(); i++) {
    //   let info = retVector.get(i);
    //   console.log(info.get(0), info.get(1), info.get(2));
    // }
  }

  render();
  
</script>

<p>
  {wasm.hello()}
</p>