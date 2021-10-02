import type * as claygl from "claygl";

export const WebGlApplication: claygl.application.IAppNS = {
    async init(app: claygl.application.App3D): Promise<void> {
        const camera = app.createCamera([0, 10, 0], [0, 0, 0], "orthographic");
        app.createAmbientLight("#fff", 1);
        app.createDirectionalLight([-1, -2, -1], "#fff", 1);

        const plane = app.createPlane();
        plane.scale.set(2, 2, 2);
        plane.rotation.rotateX(-Math.PI / 2);
        plane.position.y = -1;
        plane.material.set("color", "#ff0000");
        
        
    },
    
};
