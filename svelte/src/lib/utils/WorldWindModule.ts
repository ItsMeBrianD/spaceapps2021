/* eslint-disable @typescript-eslint/no-explicit-any */
import type {TleStore} from "../state/TleStore";
import type {TleWasmModule} from "../state/TleWasmModule";

class WWModule {
    private wasmSub: CallableFunction;

    private posSub: CallableFunction;

    private interval;

    private placemarks: Record<string, any> = {};
    
    private ww: any;

    private worldWin: any;

    private wasmModule: TleWasmModule;

    get playing() {
        return Boolean(this.interval);
    }

    animate = (): void => {
        console.log("Animating...");
    };

    play = () => {
        this.interval = setInterval(this.animate, 500);
    };

    pause = () => {
        clearInterval(this.interval);
        this.interval = undefined;
    };

    init = async (c: HTMLCanvasElement, s: TleStore): Promise<void> => {
        this.wasmSub = s.subscribe(v => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
            if (v.loading === false) {
                this.wasmModule = v.module;
            }
        });

        const ww = await import("@nasaworldwind/worldwind");
        this.ww = ww;
        console.log(this.ww);
        this.worldWin = new ww.WorldWindow(c);
        window.map = this.worldWin;

        const layers = [
            // Imagery layers.
            {layer: new ww.BMNGLayer(), enabled: true},
            // Add atmosphere layer on top of all base layers.
            {layer: new ww.AtmosphereLayer(), enabled: true},
            // ww UI layers.
            {layer: new ww.StarFieldLayer(), enabled: true},
        ];
        layers.forEach(l => { this.worldWin.addLayer(l.layer) });

        const objectsLayer = new ww.RenderableLayer("Objects");
        this.worldWin.addLayer(objectsLayer);

        this.posSub = s.positions.subscribe(allPositions => {
            allPositions.forEach(pos => {
                if (!this.placemarks[pos.id]) {
                    // Build new placemark
                    const position = new ww.Position(pos.lat, pos.long, pos.alt);

                    const placemark = new ww.Placemark(position);
                    placemark.attributes.imageScale = 5;
                    placemark.attributes.imageColor = new ww.Color(255, 0, 0, 1);
                    
                    objectsLayer.addRenderable(placemark);
                } else {
                    const position = this.placemarks[pos.id];
                    position.altitude = pos.alt;
                    position.latitude = pos.lat;
                    position.longitude = pos.long;
                }
            });
        });
    };
}


export const WorldWindModule = new WWModule();
