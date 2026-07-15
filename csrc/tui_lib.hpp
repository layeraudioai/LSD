#ifndef TUI_LIB_HPP
#define TUI_LIB_HPP
#include <vector>
#include <string>
#include <iostream>
#ifdef _WIN32
#include <conio.h>
#else
#include <termios.h>
#include <unistd.h>
#endif
struct TerminalChar {
    char ch = ' ';
    int color_pair = 0; // Simplified color mapping

    TerminalChar(char c = ' ', int cp = 0) : ch(c), color_pair(cp) {}
};
class FrameBuffer {
  public:
    int cols;
    int rows;
    std::vector<std::vector<TerminalChar>> buffer;
    FrameBuffer(int c, int r) : cols(c), rows(r) {
        clear();
    }
    void clear() {
        buffer.assign(rows, std::vector<TerminalChar>(cols, TerminalChar(' ', 0)));
    }
    void draw_box(int x, int y, int w, int h, const std::string& title = "") {
        for (int i = 0; i < w; ++i) {
            set_char(x + i, y, '-');
            set_char(x + i, y + h - 1, '-');
        }
        for (int i = 0; i < h; ++i) {
            set_char(x, y + i, '|');
            set_char(x + w - 1, y + i, '|');
        }
        set_char(x, y, '+');
        set_char(x + w - 1, y, '+');
        set_char(x, y + h - 1, '+');
        set_char(x + w - 1, y + h - 1, '+');
        if (!title.empty()) {
            draw_text(x + 2, y, title);
        }
    }
    void draw_text(int x, int y, const std::string& text) {
        for (size_t i = 0; i < text.length() && (x + (int)i) < cols; ++i) {
            set_char(x + i, y, text[i]);
        }
    }
    void render() {
      // Clear screen using ANSI
      std::cout << "\033[2J";
      for (int y = 0; y < rows; ++y) {
        std::cout << "\033[" << (y + 1) << ";1H"; // Move cursor
      for (int x = 0; x < cols; ++x) {
        std::cout << buffer[y][x].ch;
      }
    }
    std::cout.flush();
    }
    // Basic non-blocking input
    static char get_key() {
#ifdef _WIN32
      return _getch();
#else
      struct termios oldt, newt;
      char ch;
      tcgetattr(STDIN_FILENO, &oldt);
      newt = oldt;
      newt.c_lflag &= ~(ICANON | ECHO);
      tcsetattr(STDIN_FILENO, TCSANOW, &newt);
      std::cin.get(ch);
      tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
      return ch;
#endif
    }
private:
    void set_char(int x, int y, char c) {
      if (x >= 0 && x < cols && y >= 0 && y < rows) {
        buffer[y][x] = TerminalChar(c);
      } 
    }
};
#endif