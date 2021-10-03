export const shim = (WorldWind) => {
    WorldWind.WorldWindow.prototype.computeViewingTransform = function (projection, modelview) {
        if (!modelview) {
            throw new WorldWind.ArgumentError(
                WorldWind.Logger.logMessage(WorldWind.Logger.LEVEL_SEVERE, "WorldWindow", "computeViewingTransform", "missingModelview"));
        }

        modelview.setToIdentity();
        this.worldWindowController.applyLimits();
        var globe = this.globe;
        var navigator = this.navigator;
        var lookAtPosition = new WorldWind.Position(navigator.lookAtLocation.latitude, navigator.lookAtLocation.longitude, 0);
        modelview.multiplyByLookAtModelview(lookAtPosition, navigator.range, navigator.heading, navigator.tilt, navigator.roll, globe);

        if (projection) {
            projection.setToIdentity();
            var globeRadius = WorldWind.WWMath.max(globe.equatorialRadius, globe.polarRadius),
                eyePoint = modelview.extractEyePoint(new WorldWind.Vec3(0, 0, 0)),
                eyePos = globe.computePositionFromPoint(eyePoint[0], eyePoint[1], eyePoint[2], new WorldWind.Position(0, 0, 0)),
                eyeHorizon = WorldWind.WWMath.horizonDistanceForGlobeRadius(globeRadius, eyePos.altitude),
                atmosphereHorizon = WorldWind.WWMath.horizonDistanceForGlobeRadius(globeRadius, 160000),
                viewport = this.viewport;

            // Set the far clip distance to the smallest value that does not clip the atmosphere.
            // TODO adjust the clip plane distances based on the navigator's orientation - shorter distances when the
            // TODO horizon is not in view
            // TODO parameterize the object altitude for horizon distance
            var farDistance = (eyeHorizon + atmosphereHorizon) * 4;
            if (farDistance < 1e3)
                farDistance = 1e3;
            
            // Compute the near clip distance in order to achieve a desired depth resolution at the far clip distance.
            // This computed distance is limited such that it does not intersect the terrain when possible and is never
            // less than a predetermined minimum (usually one). The computed near distance automatically scales with the
            // resolution of the WebGL depth buffer.
            var nearDistance = WorldWind.WWMath.perspectiveNearDistanceForFarDistance(farDistance, 10, this.depthBits) / 4;
            console.log(nearDistance);
            
            // Prevent the near clip plane from intersecting the terrain.
            var distanceToSurface = eyePos.altitude - globe.elevationAtLocation(eyePos.latitude, eyePos.longitude);
            if (distanceToSurface > 0) {
                var maxNearDistance = WorldWind.WWMath.perspectiveNearDistance(viewport.width, viewport.height, distanceToSurface);
                if (nearDistance > maxNearDistance) {
                    nearDistance = maxNearDistance;
                }
            }

            if (nearDistance < 1) {
                nearDistance = 1;
            }

            // Compute the current projection matrix based on this navigator's perspective properties and the current
            // WebGL viewport.
            projection.setToPerspectiveProjection(viewport.width, viewport.height, nearDistance, farDistance);
        }
    };
}