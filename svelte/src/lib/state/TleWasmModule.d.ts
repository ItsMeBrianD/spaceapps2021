export interface TleWasmModuleASM {
    memory: WebAssembly.Memory;
}

export interface TleWasmModule {
    tleToObj(): number;
    asm: TleWasmModuleASM;
    hello(): string;
}
