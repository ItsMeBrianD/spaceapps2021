import type {Feature} from "geojson";
import faker from "faker";

export const getRandomGeoJson = (): Feature => ({
    type: "Feature",
    geometry: {
        type: "Point",
        coordinates: [faker.datatype.number(180), faker.datatype.number(180)],
    },
    properties: {
        name: faker.name.firstName(),
    },
});
