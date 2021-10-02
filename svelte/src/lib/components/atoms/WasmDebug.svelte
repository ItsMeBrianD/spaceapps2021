<script lang="ts">
  import { ContextKeys } from "$lib/utils/constants";
  import { getContext } from "svelte";

  const wasm = getContext(ContextKeys.WasmStore).wasmMod;

  const issTLE = 
`ISS 
1 25544U 98067A   21275.52277778  .00006056  00000-0  11838-3 0  9993
2 25544  51.6451 172.0044 0004138  50.9000 316.9051 15.48905523305232`;


  let enc = new TextEncoder();
  let issTLEArray = enc.encode(issTLE);

  console.log(issTLEArray);
  console.log(issTLEArray.length);

  console.log(wasm);
  let dataPtr = wasm._malloc(issTLEArray.length);
  console.log(dataPtr);
  let dataHeap = new Uint8Array(wasm.HEAPU8.buffer, dataPtr, issTLEArray.length);
  dataHeap.set(issTLEArray);


  console.log(wasm);
  wasm.printBuffer(dataPtr, issTLEArray.length)
  
  
  //wasm.tleToObj()

</script>

<p>
  {wasm.hello()}
</p>