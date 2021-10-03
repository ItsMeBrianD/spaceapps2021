import {writable} from "svelte/store";

const initialTime = new Date().getTime();

export const playing = writable<boolean>(false);

export const currentTime = writable<number>(initialTime);

export const selectedObject = writable<any>(null);

export enum Increment {
    SLOWER = 0.333333333,
    SLOW = 0.5,
    REAL_TIME = 1,
    FAST = 5,
    FASTER = 15,
}

class PBManager {

    increment: number = 1;

    framesPerSecond: number = 3;

    private _val = initialTime;
    
    private _interval;

    constructor() {
        playing.subscribe(v => {
            if (v) {
                // Play
                this._interval = setInterval(() => {
                    const newTime = this._val + (this.increment * 1000)/this.framesPerSecond;
                    currentTime.set(newTime);
                    this._val = newTime;
                }, 1000 / this.framesPerSecond);
            } else {
                // Pause
                clearInterval(this._interval);
            }
        });
    }

    setTime(num: number) {
        currentTime.set(num);
        this._val = num;
    }
    
}


export const PlaybackManager = new PBManager();
