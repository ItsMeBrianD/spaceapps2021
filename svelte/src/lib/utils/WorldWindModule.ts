import type {TleStore} from "../state/TleStore";

export const WorldWindModule = {
    async init(c: HTMLCanvasElement, s: TleStore): Promise<void> {
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
            {layer: new ww.CompassLayer(), enabled: true},
            {layer: new ww.CoordinatesDisplayLayer(this.worldWin), enabled: true},
            {layer: new ww.StarFieldLayer(), enabled: true},
        ];
        layers.forEach(l => { this.worldWin.addLayer(l.layer) });

        const objectsLayer = new ww.RenderableLayer("Objects");

        const initialPosition = new ww.Position(0, 0, 1000000);

        // debugger;
        const placemark = new ww.Placemark(initialPosition);
        placemark.attributes.imageScale = 5;
        placemark.attributes.imageColor = new ww.Color(255, 0, 0, 1);
        placemark.label = "My Dot";
        objectsLayer.addRenderable(placemark);

        this.worldWin.addLayer(objectsLayer);
    },
};
