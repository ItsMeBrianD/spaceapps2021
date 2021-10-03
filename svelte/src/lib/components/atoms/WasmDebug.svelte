<script lang="ts">
  import {ContextKeys} from "$lib/utils/constants";
import { millisToYMD } from "$lib/utils/date-time";
  import {getContext} from "svelte";
  const {wasmMod: wasm} = getContext(ContextKeys.WasmStore);
  async function render() {
    const tles = await fetch("/norad/iss.txt").then(async r => r.text());
    let enc = new TextEncoder();
    let tleArray = enc.encode(tles);
    let dataPtr = wasm._malloc(tleArray.length);
    let dataHeap = new Uint8Array(wasm.HEAPU8.buffer, dataPtr, tleArray.length);
    dataHeap.set(tleArray);
    let start = new Date();
    wasm.loadObjs(dataPtr, tleArray.length);
    let end = new Date();
    let elapsed = end.getTime() - start.getTime();
    console.log(`LOAD: ${elapsed}ms`);
    let retVector;
    let issID;
    for (let i = 0; i < 1; i++) {
      const secPerMonth = 30*24 *60 *60;
      start = new Date();
      //console.log(Math.floor(start.getTime()/1000) + secPerMonth*i);
      retVector = wasm.getPositions(...millisToYMD(new Date().getTime()))
      end = new Date();
      elapsed = end.getTime() - start.getTime();
      console.log(`CALC: ${elapsed}ms to calculate ${retVector.size()} positions`);
      for (let i = 0; i < retVector.size(); i++) {
        let info = retVector.get(i);
        console.log(`${info.get(0)}\t${info.get(1)}\t${info.get(2)}\t${info.get(3)}`);
        issID = info.get(0);
      }
      retVector.delete();
    }
    console.log("ORBTAL PATH BELOW")
    for(let i=0; i<10; i++){
      start = new Date();
      retVector = wasm.getPosition(...millisToYMD(start.getTime() + (92.97*60*1000/10) * i ), issID);
      console.log(`${retVector.get(0)}\t${retVector.get(1)}\t${retVector.get(2)}\t${retVector.get(3)}`);
  
      retVector.delete();
    }
  }
  render().catch(console.error);
  
</script>

<p>
  {wasm.hello()}
</p>