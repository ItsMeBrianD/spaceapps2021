import type {
    Readable, Subscriber, Unsubscriber,
} from "svelte/store";
import type {TleWasmModule} from "./TleWasmModule";

interface TleLoadingState {
    loading: true;
}

export type TleStoreState = TleLoadingState;

export class TleStore implements Readable<TleStoreState> {
    private state: TleStoreState = {loading: true};

    private subs = new Set<Subscriber<TleStoreState>>();

    private wasmMod: TleWasmModule;

    constructor() {
        (async () => {
            const wasmMod = await import("$lib/wasm/wasm");
            this.wasmMod = await new Promise(res => {
                const moduleRef = {
                    onRuntimeInitialized: () => { res(moduleRef) },
                };
                wasmMod.default(moduleRef);
            });
        })().catch(console.error);

    }

    subscribe(run: Subscriber<TleStoreState>): Unsubscriber {
        run(this.state);
        this.subs.add(run);
        return () => this.subs.delete(run);
    }
}
