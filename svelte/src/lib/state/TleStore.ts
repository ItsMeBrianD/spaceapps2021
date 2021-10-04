import type {
    Readable, Subscriber, Unsubscriber,
} from "svelte/store";
import {
    derived, writable,
} from "svelte/store";
import type {TleWasmModule} from "./TleWasmModule";

interface TleLoadingState {
    loading: true;
}

interface TleLoadedState {
    loading: false;
    module: TleWasmModule;
}

export interface TleOutput {
    id: string;
    alt: number;
    lat: number;
    long: number;
}

export type TleStoreState = TleLoadingState | TleLoadedState;

export class TleStore implements Readable<TleStoreState> {
    

    private state: TleStoreState = {loading: true};

    private subs = new Set<Subscriber<TleStoreState>>();

    private wasmMod: TleWasmModule;

    private _positions = writable<TleOutput[]>([]);

    constructor() {
        (async () => {
            const wasmMod = await import("$lib/wasm/wasm");
            this.wasmMod = await new Promise(res => {
                const moduleRef = {
                    // as unknown as TleWasmModule because emscrpiten outputs javascript that looks like it's from 2002
                    onRuntimeInitialized: () => { res(moduleRef as unknown as TleWasmModule) },
                };
                wasmMod.default(moduleRef);
            });
            this.updateState({
                loading: false,
                module: this.wasmMod,
            });
        })().catch(console.error);
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    positions: Readable<TleOutput[]> = derived(this._positions, v => v);

    subscribe(run: Subscriber<TleStoreState>): Unsubscriber {
        run(this.state);
        this.subs.add(run);
        return () => this.subs.delete(run);
    }

    updateValues(tles: string): void {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
        if (this.state.loading === true) throw new Error("Wait for Module Initialization before loading TLEs");
        const enc = new TextEncoder();
        const tleArray = enc.encode(tles);

        const dataPtr = this.state.module._malloc(tleArray.length);
        const dataHeap = new Uint8Array(this.state.module.HEAPU8.buffer, dataPtr, tleArray.length);
        dataHeap.set(tleArray);

        this.state.module.loadObjs(dataPtr, tleArray.length);
    }

    getPositions(year: number, month: number, day: number): TleOutput[] {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
        if (this.state.loading === true) throw new Error("Wait for Module Initialization before loading TLEs");
        // console.log(timestamp);
        // console.trace();
        const output = [];
        const positions = this.state.module.getPositions(year, month, day);
        for (let i = 0;i < positions.size();i++) {
            const info = positions.get(i);
            output.push({
                id: info.get(0),
                alt: parseFloat(info.get(1)),
                lat: parseFloat(info.get(2)),
                long: parseFloat(info.get(3)),
            });
        }
        this._positions.set(output);
        positions.delete();
        return output as TleOutput[];
    }

    getPosition(year: number, month: number, day: number, id: string): TleOutput {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
        if (this.state.loading === true) throw new Error("Wait for Module Initialization before loading TLEs");

        const info = this.state.module.getPosition(year, month, day, id);
        const output = {
            id: info.get(0),
            alt: parseFloat(info.get(1)),
            lat: parseFloat(info.get(2)),
            long: parseFloat(info.get(3)),
        };
        info.delete();
        return output;
    }

    getPeriod(id: string): number {
        if (this.state.loading === true) throw new Error("Wait for Module Initialization before loading TLEs");
        return this.state.module.getPeriod(id);
    }

    private updateState = (newState: TleStoreState): void => {
        this.state = newState;
        this.subs.forEach(sub => { sub(newState) });
    };
}
