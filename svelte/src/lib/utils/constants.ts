import type {SelectOption} from "$lib/components/atoms/Select.svelte";

export enum ContextKeys {
    WasmStore = "WASM_STORE",
}


export const availableDatasets: SelectOption[] = [
    {
        label: "All Data",
        value: "https://celestrak.com/pub/TLE/catalog.txt",
    },
    
    {
        label: "Last 30 Days' Launches",
        value: "https://www.celestrak.com/Norad/elements/tle-new.txt",
        group: "Special Interest Satellites",
    },
    {
        label: "Space Stations",
        value: "https://www.celestrak.com/Norad/elements/stations.txt",
        group: "Special Interest Satellites",
    },
    {
        label: "100 brightest",
        value: "https://www.celestrak.com/Norad/elements/visual.txt",
        group: "Special Interest Satellites",
    },
    {
        label: "Active Satellitesive",
        value: "https://www.celestrak.com/Norad/elements/active.txt",
        group: "Special Interest Satellites",
    },
    {
        label: "Analyst Satellites",
        value: "https://www.celestrak.com/Norad/elements/analyst.txt",
        group: "Special Interest Satellites",
    },
    {
        label: "Indian ASAT Test Debris",
        value: "https://www.celestrak.com/Norad/elements/2019-006.txt",
        group: "Special Interest Satellites",
    },
    {
        label: "FENGYUN 1C Debris",
        value: "https://www.celestrak.com/Norad/elements/1999-025.txt",
        group: "Special Interest Satellites",
    },
    {
        label: "IRIDIUM 33 Debris",
        value: "https://www.celestrak.com/Norad/elements/iridium-33-debris.txt",
        group: "Special Interest Satellites",
    },
    {
        label: "COSMOS 2251 Debris",
        value: "https://www.celestrak.com/Norad/elements/cosmos-2251-debris.txt",
        group: "Special Interest Satellites",
    },


    // // Weather / Earth
    // "https://www.celestrak.com/Norad/elements/weather.txt",
    // "https://www.celestrak.com/Norad/elements/noaa.txt",
    // "https://www.celestrak.com/Norad/elements/goes.txt",
    // "https://www.celestrak.com/Norad/elements/resource.txt",
    // "https://www.celestrak.com/Norad/elements/sarsat.txt",
    // "https://www.celestrak.com/Norad/elements/dmc.txt",
    // "https://www.celestrak.com/Norad/elements/tdrss.txt",
    // "https://www.celestrak.com/Norad/elements/argos.txt",
    // "https://www.celestrak.com/Norad/elements/planet.txt",
    // "https://www.celestrak.com/Norad/elements/spire.txt",

    // // Communications
    // "https://www.celestrak.com/Norad/elements/geo.txt",
    // "https://www.celestrak.com/satcat/gpz.php",
    // "https://www.celestrak.com/satcat/gpz-plus.php",
    // "https://www.celestrak.com/Norad/elements/intelsat.txt",
    // "https://www.celestrak.com/Norad/elements/ses.txt",
    // "https://www.celestrak.com/Norad/elements/iridium.txt",
    // "https://www.celestrak.com/Norad/elements/iridium-NEXT.txt",
    // "https://www.celestrak.com/Norad/elements/starlink.txt",
    // "https://www.celestrak.com/Norad/elements/oneweb.txt",
    // "https://www.celestrak.com/Norad/elements/orbcomm.txt",
    // "https://www.celestrak.com/Norad/elements/globalstar.txt",
    // "https://www.celestrak.com/Norad/elements/swarm.txt",
    // "https://www.celestrak.com/Norad/elements/amateur.txt",
    // "https://www.celestrak.com/Norad/elements/x-comm.txt",
    // "https://www.celestrak.com/Norad/elements/other-comm.txt",
    // "https://www.celestrak.com/Norad/elements/satnogs.txt",
    // "https://www.celestrak.com/Norad/elements/gorizont.txt",
    // "https://www.celestrak.com/Norad/elements/raduga.txt",
    // "https://www.celestrak.com/Norad/elements/molniya.txt",

    // // Navigation Satellites
    // "https://www.celestrak.com/Norad/elements/gnss.txt",
    // "https://www.celestrak.com/Norad/elements/gps-ops.txt",
    // "https://www.celestrak.com/Norad/elements/glo-ops.txt",
    // "https://www.celestrak.com/Norad/elements/galileo.txt",
    // "https://www.celestrak.com/Norad/elements/beidou.txt",
    // "https://www.celestrak.com/Norad/elements/sbas.txt",
    // "https://www.celestrak.com/Norad/elements/nnss.txt",
    // "https://www.celestrak.com/Norad/elements/musson.txt",

    // // Scientific Satellites
    // "https://www.celestrak.com/Norad/elements/science.txt",
    // "https://www.celestrak.com/Norad/elements/geodetic.txt",
    // "https://www.celestrak.com/Norad/elements/engineering.txt",
    // "https://www.celestrak.com/Norad/elements/education.txt",

    // // Miscellaneous Satellites
    // "https://www.celestrak.com/Norad/elements/military.txt",
    // "https://www.celestrak.com/Norad/elements/radar.txt",
    // "https://www.celestrak.com/Norad/elements/cubesat.txt",
    // "https://www.celestrak.com/Norad/elements/other.txt",
];
