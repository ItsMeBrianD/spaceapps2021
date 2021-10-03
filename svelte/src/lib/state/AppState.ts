import {writable} from "svelte/store";

const initialTime = Math.floor(new Date().getTime() / 1000);

export const playing = writable<boolean>(false);

export const currentTime = writable<number>(initialTime);


class PBManager {

    increment: number = 1;

    private _val = initialTime;
    
    private _interval;

    constructor() {
        playing.subscribe(v => {
            if (v) {
                // Play
                this._interval = setInterval(() => {
                    const newTime = this._val + this.increment;
                    currentTime.set(newTime);
                    this._val = newTime;
                }, 1000);
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
