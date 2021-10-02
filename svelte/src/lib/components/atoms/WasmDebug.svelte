<script lang="ts">
  import {ContextKeys} from "$lib/utils/constants";
  import {getContext} from "svelte";

  const wasm = getContext(ContextKeys.WasmStore).wasmMod;

  const issTLE 
= `ISS 
1 25544U 98067A   21275.52277778  .00006056  00000-0  11838-3 0  9993
2 25544  51.6451 172.0044 0004138  50.9000 316.9051 15.48905523305232
ISS 
1 25544U 98067A   21275.52277778  .00006056  00000-0  11838-3 0  9993
2 25544  51.6451 172.0044 0004138  50.9000 316.9051 15.48905523305232
ISS 
1 25544U 98067A   21275.52277778  .00006056  00000-0  11838-3 0  9993
2 25544  51.6451 172.0044 0004138  50.9000 316.9051 15.48905523305232
ISS 
1 25544U 98067A   21275.52277778  .00006056  00000-0  11838-3 0  9993
2 25544  51.6451 172.0044 0004138  50.9000 316.9051 15.48905523305232
ISS 
1 25544U 98067A   21275.52277778  .00006056  00000-0  11838-3 0  9993
2 25544  51.6451 172.0044 0004138  50.9000 316.9051 15.48905523305232
`;

  let enc = new TextEncoder();
  let issTLEArray = enc.encode(issTLE);

  let dataPtr = wasm._malloc(issTLEArray.length);
  let dataHeap = new Uint8Array(wasm.HEAPU8.buffer, dataPtr, issTLEArray.length);
  dataHeap.set(issTLEArray);

  let retVector = wasm.getPositions(dataPtr, issTLEArray.length);

  console.log(retVector);
  console.log(retVector.size());

  for (let i = 0; i < retVector.size(); i++) {
    let info = retVector.get(i);
    for (let j = 0; j < info.size(); j++) {
      console.log(info.get(j));
    }
  }

  // const vector = wasm.bufferToTLEs(dataPtr, issTLEArray.length);
  // console.log(vector);
  // console.log("here");
  // console.log(vector.size());
  // for (let i = 0; i < vector.size(); i++) {
  //   console.log(vector.get(i));
  // }
  
  
</script>

<p>
  {wasm.hello(),}
</p>