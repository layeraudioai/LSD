#include <iostream>
#include <string>
#include <vector>
#include <cstring>
#include "tui_lib.hpp"
#include "indexer.h"

extern "C" {
    void run_tui_wrapper(const char** paths, int num_paths, SearchParams initial_params) {
        SearchParams params = initial_params;
        bool running = true;

        while (running) {
            int num_results = 0;
            SearchResult* results = search_paths((char**)paths, num_paths, params, &num_results);

            FrameBuffer fb(80, 20);
            fb.clear();
            fb.draw_box(0, 0, 80, 20, "LSD TUI (P: Pattern, T: Threshold, Q: Quit)");
            fb.draw_text(2, 2, "Pattern: " + std::string(params.pattern) + " | Threshold: " + std::to_string(params.threshold));
            
            for(int i=0; i<num_results && i < 10; ++i) {
                fb.draw_text(2, 4 + i, results[i].path);
            }
            
            fb.render();
            free_search_results(results, num_results);

            char key = FrameBuffer::get_key();
            if (key == 'q') running = false;
            else if (key == 'p') {
                std::cout << "\033[20;1HEnter new pattern: ";
                std::string new_pattern;
                std::getline(std::cin, new_pattern);
                params.pattern = strdup(new_pattern.c_str());
            } else if (key == 't') {
                std::cout << "\033[20;1HEnter new threshold: ";
                std::string new_threshold;
                std::getline(std::cin, new_threshold);
                params.threshold = std::stof(new_threshold);
            }
        }
    }
}
