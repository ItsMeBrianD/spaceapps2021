import type {SelectOption} from "$lib/components/atoms/Select.svelte";

export enum ContextKeys {
    WasmStore = "WASM_STORE",
    MapStore = "MAP_STORE",
}


export const availableDatasets: SelectOption[] = [
    {
        label: "Select A Dataset",
        value: "",
    },
    {
        label: "All Data",
        value: "/norad/catalog.txt",
    },
    {
        label: "ISS Only",
        value: "/norad/iss.txt",
    },

    {
        label: "Last 30 Days' Launches",
        value: "/norad/tle-new.txt",
        group: "Special Interest Satellites",
    },
    {
        label: "Space Stations",
        value: "/norad/stations.txt",
        group: "Special Interest Satellites",
    },
    {
        label: "100 brightest",
        value: "/norad/visual.txt",
        group: "Special Interest Satellites",
    },
    {
        label: "Active Satellites",
        value: "/norad/active.txt",
        group: "Special Interest Satellites",
    },
    {
        label: "Analyst Satellites",
        value: "/norad/analyst.txt",
        group: "Special Interest Satellites",
    },
    {
        label: "Indian ASAT Test Debris",
        value: "/norad/2019-006.txt",
        group: "Special Interest Satellites",
    },
    {
        label: "FENGYUN 1C Debris",
        value: "/norad/1999-025.txt",
        group: "Special Interest Satellites",
    },
    {
        label: "IRIDIUM 33 Debris",
        value: "/norad/iridium-33-debris.txt",
        group: "Special Interest Satellites",
    },
    {
        label: "COSMOS 2251 Debris",
        value: "/norad/cosmos-2251-debris.txt",
        group: "Special Interest Satellites",
    },

    {
        label: "Weather",
        value: "/norad/weather.txt",
        group: "Weather & Earth Resources Satellites",
    },
    {
        label: "NOAA",
        value: "/norad/noaa.txt",
        group: "Weather & Earth Resources Satellites",
    },
    {
        label: "GOES",
        value: "/norad/goes.txt",
        group: "Weather & Earth Resources Satellites",
    },
    {
        label: "Earth Resources",
        value: "/norad/resource.txt",
        group: "Weather & Earth Resources Satellites",
    },
    {
        label: "Search & Rescue (SARSAT)",
        value: "/norad/sarsat.txt",
        group: "Weather & Earth Resources Satellites",
    },
    {
        label: "Disaster Monitoring",
        value: "/norad/dmc.txt",
        group: "Weather & Earth Resources Satellites",
    },
    {
        label: "Tracking and Data Relay Satellite System (TDRSS)",
        value: "/norad/tdrss.txt",
        group: "Weather & Earth Resources Satellites",
    },
    {
        label: "ARGOS Data Collection System",
        value: "/norad/argos.txt",
        group: "Weather & Earth Resources Satellites",
    },
    {
        label: "Planet",
        value: "/norad/planet.txt",
        group: "Weather & Earth Resources Satellites",
    },
    {
        label: "Spire",
        value: "/norad/spire.txt",
        group: "Weather & Earth Resources Satellites",
    },
    
    {
        label: "Active Geosynchronous",
        value: "/norad/geo.txt",
        group: "Communications",
    },
    {
        label: "GEO Protected Zone",
        value: "https://www.celestrak.com/satcat/gpz.php",
        group: "Communications",
    },
    {
        label: "GEO Protected Zone Plus",
        value: "https://www.celestrak.com/satcat/gpz-plus.php",
        group: "Communications",
    },
    {
        label: "Intelsat",
        value: "/norad/intelsat.txt",
        group: "Communications",
    },
    {
        label: "SES",
        value: "/norad/ses.txt",
        group: "Communications",
    },
    {
        label: "Iridium",
        value: "/norad/iridium.txt",
        group: "Communications",
    },
    {
        label: "Iridium NEXT",
        value: "/norad/iridium-NEXT.txt",
        group: "Communications",
    },
    {
        label: "Starlink",
        value: "/norad/starlink.txt",
        group: "Communications",
    },
    {
        label: "OneWeb",
        value: "/norad/oneweb.txt",
        group: "Communications",
    },
    {
        label: "Orbcomm",
        value: "/norad/orbcomm.txt",
        group: "Communications",
    },
    {
        label: "Globalstar",
        value: "/norad/globalstar.txt",
        group: "Communications",
    },
    {
        label: "Swarm",
        value: "/norad/swarm.txt",
        group: "Communications",
    },
    {
        label: "Amateur Radio",
        value: "/norad/amateur.txt",
        group: "Communications",
    },
    {
        label: "Experimental",
        value: "/norad/x-comm.txt",
        group: "Communications",
    },
    {
        label: "Other Comm",
        value: "/norad/other-comm.txt",
        group: "Communications",
    },
    {
        label: "SatNOGS",
        value: "/norad/satnogs.txt",
        group: "Communications",
    },
    {
        label: "Gorizont",
        value: "/norad/gorizont.txt",
        group: "Communications",
    },
    {
        label: "Raduga",
        value: "/norad/raduga.txt",
        group: "Communications",
    },
    {
        label: "Molniya",
        value: "/norad/molniya.txt",
        group: "Communications",
    },
    
    {
        label: "GNSS",
        value: "/norad/gnss.txt",
        group: "Navigation Satellites",
    },
    {
        label: "GPS Operational",
        value: "/norad/gps-ops.txt",
        group: "Navigation Satellites",
    },
    {
        label: "GLONASS Operational",
        value: "/norad/glo-ops.txt",
        group: "Navigation Satellites",
    },
    {
        label: "Galileo",
        value: "/norad/galileo.txt",
        group: "Navigation Satellites",
    },
    {
        label: "Beidou",
        value: "/norad/beidou.txt",
        group: "Navigation Satellites",
    },
    {
        label: "Satellite-Based Augmentation System (WAAS/EGNOS/MSAS)",
        value: "/norad/sbas.txt",
        group: "Navigation Satellites",
    },
    {
        label: "Navy Navigation Satellite System (NNSS)",
        value: "/norad/nnss.txt",
        group: "Navigation Satellites",
    },
    {
        label: "Russian LEO Navigation",
        value: "/norad/musson.txt",
        group: "Navigation Satellites",
    },
    
    {
        label: "Space & Earth Science",
        value: "/norad/science.txt",
        group: "Scientific Satellites",
    },
    {
        label: "Geodetic",
        value: "/norad/geodetic.txt",
        group: "Scientific Satellites",
    },
    {
        label: "Engineering",
        value: "/norad/engineering.txt",
        group: "Scientific Satellites",
    },
    {
        label: "Education",
        value: "/norad/education.txt",
        group: "Scientific Satellites",
    },
    
    {
        label: "Miscellaneous Military",
        value: "/norad/military.txt",
        group: "Miscellaneous Satellites",
    },
    {
        label: "Radar Calibration",
        value: "/norad/radar.txt",
        group: "Miscellaneous Satellites",
    },
    {
        label: "CubeSats",
        value: "/norad/cubesat.txt",
        group: "Miscellaneous Satellites",
    },
    {
        label: "Other",
        value: "/norad/other.txt",
        group: "Miscellaneous Satellites",
    },
];
