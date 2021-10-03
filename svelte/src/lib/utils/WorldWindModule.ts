/* eslint-disable @typescript-eslint/no-explicit-any */
import type {TleStore} from "../state/TleStore";

class WWModule {
    private interval;

    private placemarks = [];
    
    private ww: any;

    private worldWin: any;

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
        const ww = await import("@nasaworldwind/worldwind");
        this.ww = ww;
        console.log(this.ww);
        this.worldWin = new ww.WorldWindow(c);

        const layers = [
            // Imagery layers.
            {layer: new ww.BMNGLayer(), enabled: true},
            // Add atmosphere layer on top of all base layers.
            {layer: new ww.AtmosphereLayer(), enabled: true},
            // ww UI layers.
            {layer: new ww.CoordinatesDisplayLayer(this.worldWin), enabled: true},
            {layer: new ww.StarFieldLayer(), enabled: true},
        ];
        layers.forEach(l => { this.worldWin.addLayer(l.layer) });

        const objectsLayer = new ww.RenderableLayer("Objects");
        this.worldWin.addLayer(objectsLayer);

        const initialPosition = new ww.Position(0, 0, 2000000);

        
        const placemark = new ww.Placemark(initialPosition);
        placemark.attributes.imageScale = 5;
        placemark.attributes.imageColor = new ww.Color(255, 0, 0, 1);
        objectsLayer.addRenderable(placemark);

        this.placemarks.push(placemark);
    };
}


export const WorldWindModule = new WWModule();