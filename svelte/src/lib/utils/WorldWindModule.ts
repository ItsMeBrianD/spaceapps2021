/* eslint-disable @typescript-eslint/no-explicit-any */
import {currentTime, selectedObject} from "../state/AppState";
import type {TleStore} from "../state/TleStore";
import {getTimeArray, millisToYMD} from "./date-time";
import {shim} from "./WorldWindShim";

class WWModule {
    yeet: CallableFunction;

    placemarks: Record<string, any> = {};

    private orbitLayer;
    private objectsLayer;

    get redraw(): CallableFunction {
        return this.worldWin.redraw.bind(this.worldWin) as CallableFunction;
    }

    private defaultGlobe;

    private currentProjection = "3d";

    private selected;
    private currentTimeValue;

    private dirty;

    set projection(v: "2d" | "3d") {
        
        if (v === "2d") {
            const map = new this.ww.Globe2D();
            map.projection = new this.ww.ProjectionEquirectangular();
            this.worldWin.globe = map;
        } else {
            this.worldWin.globe = this.defaultGlobe;
        }
        this.currentProjection = v;

        this.onProjectionChange();
        this.worldWin.redraw();
    }

    private unsubs: CallableFunction[] = [];
    
    private ww: any;

    private worldWin: any;

    private store: TleStore;

    private map: any;


    init = async (c: HTMLCanvasElement, s: TleStore): Promise<void> => {        

        this.store = s;
        
        const ww = await import("@nasaworldwind/worldwind");

        shim(ww);

        ww.configuration.gpuCacheSize = 1000e6; // 500 MB


        this.ww = ww;
        this.worldWin = new ww.WorldWindow(c);
        this.defaultGlobe = this.worldWin.globe;
        
        const layers = [
            // Imagery layers.
            {layer: new ww.BMNGLayer(), enabled: true},
            // Add atmosphere layer on top of all base layers.
            {layer: new ww.AtmosphereLayer(), enabled: true},
            // ww UI layers.
            {layer: new ww.StarFieldLayer(), enabled: true},
        ];
        layers.forEach(l => { this.worldWin.addLayer(l.layer) });

        this.objectsLayer = new ww.RenderableLayer("Objects");
        this.worldWin.addLayer(this.objectsLayer);

        this.yeet = () => {
            this.objectsLayer.removeAllRenderables();
            if (this.orbitLayer) this.orbitLayer.removeAllRenderables();
            this.placemarks = {};
        };

        selectedObject.subscribe(x => { this.selected = x });

        const posSub = s.positions.subscribe(allPositions => {
            this.drawDots(allPositions);

            if (this.dirty && this.selected) {
                this.placemarks[this.selected.id].highlighted = true;
            }
            
            if (this.dirty) {
                this.dirty = false;
            }
        });
        this.unsubs.push(posSub);

        // The common gesture-handling function.
        const handleClick = async recognizer => {
            if (this.orbitLayer) this.orbitLayer.removeAllRenderables();
            // Obtain the event location.
            const x = recognizer.clientX,
                  y = recognizer.clientY;

            // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
            // relative to the upper left corner of the canvas rather than the upper left corner of the page.
            const pickList = this.worldWin.pick(this.worldWin.canvasCoordinates(x, y));

            // If more than one object clicked, top of the array is top object clicked, if its not terrain it is an object
            if (pickList.objects.length && !pickList.objects[0]?.isTerrain) {
                const id = pickList.objects[0].userObject.userProperties.id;
                this.drawOrbit(id);
            } else {
                selectedObject.update(curr => {
                    if (!curr) return null;
                    this.placemarks[curr.id].label = undefined;
                    this.placemarks[curr.id].highlighted = false;

                    return null;
                });
            }
            
            this.worldWin.redraw();
        };
        new ww.ClickRecognizer(this.worldWin, handleClick);
        new ww.TapRecognizer(this.worldWin, handleClick);

        const timeChangedSub = currentTime.subscribe(time => {
            this.currentTimeValue = time;
            this.store.getPositions(...millisToYMD(time));
        });
        this.unsubs.push(timeChangedSub);
    };

    drawDots = (allPositions) => {
        allPositions.forEach(pos => {
            const properties = {
                id: pos.id,
                lat: pos.lat,
                long: pos.long,
                alt: pos.alt,
            };

            if (!this.placemarks[pos.id]) {
                // Build new placemark
                const position = new this.ww.Position(pos.lat, pos.long, this.currentProjection === "3d" ? pos.alt : 0);

                const placemark = new this.ww.Placemark(position);
                placemark.userProperties = properties;
                placemark.attributes.imageScale = 0.6;
                placemark.attributes.imageSource = "/images/yellow.png";

                placemark.highlightAttributes = new this.ww.PlacemarkAttributes(placemark.attributes);
                placemark.highlightAttributes.imageScale = 0.8;
                placemark.highlightAttributes.imageSource = "/images/pink.png";
                placemark.highlightAttributes.drawLeaderLine = true;
                placemark.highlightAttributes.leaderLineAttributes.outlineColor = new this.ww.Color(0.850980392, 0.290196078, 0.701960784, 1); // yellow
                
                this.objectsLayer.addRenderable(placemark);

                this.placemarks[pos.id] = placemark;
            } else {
                this.placemarks[pos.id].position.altitude = this.currentProjection === "3d" ? pos.alt : 0;
                this.placemarks[pos.id].position.latitude = pos.lat;
                this.placemarks[pos.id].position.longitude = pos.long;
            }

            if (pos.id === this.selected?.id) {
                selectedObject.set(properties);
            }

            if (this.selected?.id === pos.id) {
                console.log(this.placemarks);
                this.placemarks[pos.id].highlighted = true;
                console.log(this.placemarks[pos.id].highlighted);
                console.log(this.placemarks[pos.id]);
            }
        });
        this.worldWin.redraw();
    };

    drawOrbit = (id) => {
        this.placemarks[id].highlighted = true;
        selectedObject.update(curr => {
            if (curr) {
                this.placemarks[curr.id].label = undefined;
                this.placemarks[curr.id].highlighted = false;
            }
            return this.placemarks[id].userProperties;
        });

        // Show orbit
        const rpd = this.store.getPeriod(id); //period is rev/day 
        const period = (1 / rpd) * 60 * 24; //period in min/rev
        const timeArray = getTimeArray(this.currentTimeValue, period, 100);
        const positions = timeArray.map(time => this.store.getPosition(...millisToYMD(time), id));
        const pathPositions = positions.map(pos => new this.ww.Position(pos.lat, pos.long, this.currentProjection === "3d" ? pos.alt : 0));

        const path = new this.ww.Path(pathPositions, null);
        path.altitudeMode = this.ww.RELATIVE_TO_GROUND; // The path's altitude stays relative to the terrain's altitude.
        path.followTerrain = false;

        const pathAttributes = new this.ww.ShapeAttributes(null);
        pathAttributes.outlineColor = new this.ww.Color(0.850980392, 0.290196078, 0.701960784, 1);
        pathAttributes.drawVerticals = path.extrude; // Draw verticals only when extruding.
        path.attributes = pathAttributes;
                
        // Add the path to a layer and the layer to the WorldWindow's layer list.
        this.orbitLayer = new this.ww.RenderableLayer();
        this.orbitLayer.displayName = "Paths";
        this.orbitLayer.addRenderable(path);

        this.worldWin.addLayer(this.orbitLayer);
    };

    onProjectionChange = () => {
        this.yeet();
        this.store.getPositions(...millisToYMD(this.currentTimeValue));

        // const allPositions = Object.values(this.placemarks).map(v => v.userProperties);
        // this.drawDots(allPositions);

        if (this.selected) {
            this.dirty = true;
            this.drawOrbit(this.selected.id);
        }
    };

    destroy = (): void => {
        this.unsubs.forEach(u => { u() });
    };
}


export const WorldWindModule = new WWModule();
