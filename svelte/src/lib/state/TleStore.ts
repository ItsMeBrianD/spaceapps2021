import type {
    Readable, Subscriber, Unsubscriber,
} from "svelte/store";
import type {TleWasmModule} from "./TleWasmModule";

interface TleLoadingState {
    loading: true;
}

interface TleLoadedState {
    loading: false;
    module: TleWasmModule;
}

export type TleStoreState = TleLoadingState | TleLoadedState;

export class TleStore implements Readable<TleStoreState> {
    private state: TleStoreState = {loading: true};

    private subs = new Set<Subscriber<TleStoreState>>();

    private wasmMod: TleWasmModule;

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

    subscribe(run: Subscriber<TleStoreState>): Unsubscriber {
        run(this.state);
        this.subs.add(run);
        return () => this.subs.delete(run);
    }

    private updateState = (newState: TleStoreState): void => {
        this.state = newState;
        this.subs.forEach(sub => { sub(newState) });
    };
}
