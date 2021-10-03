/* eslint-disable @typescript-eslint/no-explicit-any */
import {currentTime, selectedObject} from "../state/AppState";
import type {TleStore} from "../state/TleStore";
import { millisToYMD } from "./date-time";

class WWModule {
    yeet: CallableFunction;

    placemarks: Record<string, any> = {};

    get redraw() {
        return this.worldWin.redraw.bind(this.worldWin);
    }

    private unsubs: CallableFunction[] = [];
    
    private ww: any;

    private worldWin: any;

    private store: TleStore;


    init = async (c: HTMLCanvasElement, s: TleStore): Promise<void> => {
        this.store = s;
        
        const ww = await import("@nasaworldwind/worldwind");

        this.ww = ww;
        this.worldWin = new ww.WorldWindow(c);
        window.map = this.worldWin;



        // Drawing paths
        const pathPositions = [];
        const alt = 10000000;
        const numPoints = 10;
        for (let i = 0;i < numPoints + 1;i++) {
            const long = 360 / numPoints * i;
            pathPositions.push(new ww.Position(0, long, alt));
        }

        const path = new ww.Path(pathPositions, null);
        path.altitudeMode = ww.RELATIVE_TO_GROUND; // The path's altitude stays relative to the terrain's altitude.
        path.followTerrain = false;

        const pathAttributes = new ww.ShapeAttributes(null);
        pathAttributes.outlineColor = ww.Color.BLUE;
        pathAttributes.interiorColor = new ww.Color(0, 1, 1, 0.5);
        pathAttributes.drawVerticals = path.extrude; // Draw verticals only when extruding.
        path.attributes = pathAttributes;

        // Create and assign the path's highlight attributes.
        const highlightAttributes = new ww.ShapeAttributes(pathAttributes);
        highlightAttributes.outlineColor = ww.Color.RED;
        highlightAttributes.interiorColor = new ww.Color(1, 1, 1, 0.5);
        path.highlightAttributes = highlightAttributes;
        
        // Add the path to a layer and the layer to the WorldWindow's layer list.
        const pathsLayer = new ww.RenderableLayer();
        pathsLayer.displayName = "Paths";
        pathsLayer.addRenderable(path);

        const layers = [
            // Imagery layers.
            {layer: new ww.BMNGLayer(), enabled: true},
            // Add atmosphere layer on top of all base layers.
            {layer: new ww.AtmosphereLayer(), enabled: true},
            // ww UI layers.
            {layer: new ww.StarFieldLayer(), enabled: true},

            // Orbital paths layer
            // {layer: pathsLayer, enabled: true},
        ];
        layers.forEach(l => { this.worldWin.addLayer(l.layer) });

        const objectsLayer = new ww.RenderableLayer("Objects");
        this.worldWin.addLayer(objectsLayer);

        this.yeet = () => {
            objectsLayer.removeAllRenderables();
            this.placemarks = {};
        };

        let selected;
        selectedObject.subscribe(x => { selected = x });

        const posSub = s.positions.subscribe(allPositions => {
            allPositions.forEach(pos => {
                const properties = {
                    id: pos.id,
                    lat: pos.lat,
                    long: pos.long,
                    alt: pos.alt,
                };

                if (!this.placemarks[pos.id]) {
                    // Build new placemark
                    const position = new ww.Position(pos.lat, pos.long, pos.alt);

                    const placemark = new ww.Placemark(position);
                    placemark.userProperties = properties;
                    placemark.attributes.imageScale = 0.6;
                    placemark.attributes.imageSource = "/images/yellow.png";

                    placemark.highlightAttributes = new ww.PlacemarkAttributes(placemark.attributes);
                    placemark.highlightAttributes.imageScale = 0.8;
                    placemark.highlightAttributes.imageSource = "/images/pink.png";
                    placemark.highlightAttributes.drawLeaderLine = true;
                    placemark.highlightAttributes.leaderLineAttributes.interiorColor = new ww.Color(0.960784314, 0.752941176, 0.305882353, 1);
                    
                    objectsLayer.addRenderable(placemark);

                    this.placemarks[pos.id] = placemark;
                } else {
                    this.placemarks[pos.id].position.altitude = pos.alt;
                    this.placemarks[pos.id].position.latitude = pos.lat;
                    this.placemarks[pos.id].position.longitude = pos.long;
                }

                if (pos.id === selected?.id) {
                    selectedObject.set(properties);
                }
            });
            this.worldWin.redraw();
        });
        this.unsubs.push(posSub);

        // The common gesture-handling function.
        const handleClick = recognizer => {
            // Obtain the event location.
            const x = recognizer.clientX,
                  y = recognizer.clientY;

            // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
            // relative to the upper left corner of the canvas rather than the upper left corner of the page.
            const pickList = this.worldWin.pick(this.worldWin.canvasCoordinates(x, y));

            // If more than one object clicked, top of the array is top object clicked, if its not terrain it is an object
            if (pickList.objects.length && !pickList.objects[0]?.isTerrain) {
                const properties = pickList.objects[0].userObject.userProperties;
                this.placemarks[properties.id].label = "Loading...";
                this.placemarks[properties.id].highlighted = true;
                selectedObject.update(curr => {
                    if (curr) {
                        this.placemarks[curr.id].label = undefined;
                        this.placemarks[curr.id].highlighted = false;
                    }
                    return properties;
                });
            } else {
                selectedObject.update(curr => {
                    if (!curr) return;
                    this.placemarks[curr.id].label = undefined;
                    this.placemarks[curr.id].highlighted = false;
                    return null;
                });
            }
            
            this.worldWin.redraw();
        };

        // Listen for mouse clicks.
        const clickRecognizer = new ww.ClickRecognizer(this.worldWin, handleClick);

        // Listen for taps on mobile devices.
        const tapRecognizer = new ww.TapRecognizer(this.worldWin, handleClick);

        const timeChangedSub = currentTime.subscribe(time => this.store.getPositions(...millisToYMD(time)));
        this.unsubs.push(timeChangedSub);
    };

    destroy = (): void => {
        this.unsubs.forEach(u => { u() });
    };
}


export const WorldWindModule = new WWModule();
