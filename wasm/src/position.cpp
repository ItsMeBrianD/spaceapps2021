#include <iostream>
#include <sstream>
#include <vector>

/**
 * Converts a buffer of characters at a given memory address to an array of TLE formatted orbital data.
 */
std::vector<std::string> bufferToTLEs(uintptr_t address, int length) {
  const char *ptr = reinterpret_cast<char *>(address);

  std::vector<std::string> out;
  std::stringstream ss;
  int newLineCount = 0;

  for (int i = 0; i < length; i++) {
    char c = ptr[i];
    if (c == '\n' && newLineCount == 3) {
      const std::string& tmp = ss.str();   
      const char* cstr = tmp.c_str();

      out.push_back(cstr);
      newLineCount = 0;
    } else {
      ss << c;
    }
  }

  return out;
}

// int* getPosition(std::string tle) {

// }

// std::vector<std::vector<int>> getPositions(uintptr_t tlesAddress, int length) {

// }