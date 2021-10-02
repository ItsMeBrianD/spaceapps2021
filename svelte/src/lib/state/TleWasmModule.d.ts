export interface TleWasmModuleASM {
    memory: WebAssembly.Memory;
}

export interface TleWasmModule {
    tleToObj(l0: string, l1: string): number;
    asm: TleWasmModuleASM;
    printBuffer(buffer: number, length: number);
    hello(): string;
    bufferToTLEs(tlesAddress: number, length: number): any;
    getPositions(tlesAddress: number, length: number): any;
}
