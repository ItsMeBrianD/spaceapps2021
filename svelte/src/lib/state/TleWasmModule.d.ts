export interface TleWasmModuleASM {
    memory: WebAssembly.Memory;
}

export interface TleWasmModule {
    asm: TleWasmModuleASM;
    hello(): string;
}
