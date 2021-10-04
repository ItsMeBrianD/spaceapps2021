![Sprocket Orbital Tracker](https://github.com/0c370t/spaceapps2021/blob/main/svelte/static/images/Full_Logo_Light.png?raw=true)

---

This repository was created by [Brian Donald](https://github.com/0c370t), [Bryan Pikaard](https://github.com/bwpikaard), [Zach Stence](https://github.com/zachstence), and [Andreas Wenzel](https://github.com/andreasmwenzel) for [SpaceApps 2021](https://www.spaceappschallenge.org/).  

The Orbital Tracker uses [TLE](https://en.wikipedia.org/wiki/Two-line_element_set) data to calculate and interpolate the position of objects orbiting earth, and then renders them in a web page that makes the data more accessible and interactive. You can view a live link at [https://2021.spaceapps.sprocket.gg](https://2021.spaceapps.sprocket.gg).  

## Project Structure

```
┌─ svelte            | the SvelteKit portion of the application
├┬─ src              | 
│├─ lib              | client-side code
│├┬─ components      | reusable .svelte components
││├─ state           | stores used for state management
││├─ utils           | misc. functionality (i.e. date/time helper functions)
││└─ wasm            | output from emscripten used to interact with wasm
│└─ routes           | top-level page components and api endpoints
└─ static            | Static Assets

┌ wasm               | the C++ portion of the application
├─ src               | all C++ Source code
└─ js_wraps          | snippets of javascript that are pre/post-pended to the emscripten output
```

## Building and Running Locally

1. Clone the repository
1. To run the SvelteKit application
   1. `npm i` in the `svelte` directory
   1. `npm run dev` in the `svelte` directory
   1. Open [localhost:3000](http://localhost:3000)
1. To run/build the C++ application  
   Note: The build script for `wasm` assumes that you are on a unix-like system, with access to `sed`
   1. Ensure you have the [EMScripten SDK]() installed (*if working with the C++ portion*)
   1. Run `build.sh` in the `wasm` directory.

