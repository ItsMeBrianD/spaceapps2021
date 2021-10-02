#include <iostream>
#include <emscripten/bind.h>

using namespace emscripten;

std::string hello() {
  return "hello world";
}

// Expose functions to the outside world
EMSCRIPTEN_BINDINGS(my_module) {
//function(function_javascript_name, function_reference)
  function("hello", &hello);
}

