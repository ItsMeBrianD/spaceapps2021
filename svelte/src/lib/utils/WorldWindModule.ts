/* eslint-disable @typescript-eslint/no-explicit-any */
import {currentTime, playing} from "../state/AppState";
import type {TleStore} from "../state/TleStore";
import type {TleWasmModule} from "../state/TleWasmModule";

class WWModule {
    yeet: CallableFunction;


    private unsubs: CallableFunction[] = [];

    private placemarks: Record<string, any> = {};
    
    private ww: any;

    private worldWin: any;


    private store: TleStore;

    init = async (c: HTMLCanvasElement, s: TleStore): Promise<void> => {
        this.store = s;
        
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

        this.yeet = () => {
            objectsLayer.removeAllRenderables();
            this.placemarks = {};
        };

        const posSub = s.positions.subscribe(allPositions => {
            allPositions.forEach(pos => {
                if (!this.placemarks[pos.id]) {
                    // Build new placemark
                    const position = new ww.Position(pos.lat, pos.long, pos.alt);

                    const placemark = new ww.Placemark(position);
                    placemark.attributes.imageScale = 5;
                    placemark.attributes.imageColor = new ww.Color(255, 0, 0, 1);
                    
                    objectsLayer.addRenderable(placemark);

                    this.placemarks[pos.id] = placemark;
                } else {
                    this.placemarks[pos.id].position.altitude = pos.alt;
                    this.placemarks[pos.id].position.latitude = pos.lat;
                    this.placemarks[pos.id].position.longitude = pos.long;
                }
            });
        });
        this.unsubs.push(posSub);

        const timeChangedSub = currentTime.subscribe(time => this.store.getPositions(Math.floor(time)));
        console.log(timeChangedSub);
        this.unsubs.push(timeChangedSub);
    };

    destroy = (): void => {
        this.unsubs.forEach(u => { u() });
    };
}


export const WorldWindModule = new WWModule();
