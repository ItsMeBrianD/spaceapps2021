export interface TleWasmModuleASM {
    memory: WebAssembly.Memory;
}

export interface TleWasmModule {
    asm: TleWasmModuleASM;
    HEAPU8: Uint8Array;

    tleToObj(l0: string, l1: string): number;
    printBuffer(buffer: number, length: number);
    hello(): string;
    loadTLEs(tlesAddress: number, length: number): any;
    loadObjs(address: number, length: number): any;
    getPositions(year: number, month: number, day: number): any;
    _malloc(x: number);
    
}
