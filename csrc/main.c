#include <iostream>
#include <string.h>
#include <stdbool.h>
#include <stdlib.h>
#include "cli.h"
#include "indexer.h"

extern "C" void run_tui_wrapper(const char** paths, int num_paths, SearchParams params);

void print_usage() {
    std::cout << "Usage: lsd [options]" << std::endl;
    std::cout << "Options:" << std::endl;
    std::cout << "  -h, --help                Print this help" << std::endl;
    std::cout << "  -n, --noui                Run in CLI (no UI) mode" << std::endl;
    std::cout << "  -d, --directory <dir>     Default input directory" << std::endl;
    std::cout << "  -p, --pattern <pattern>   Default search pattern" << std::endl;
    std::cout << "  -t, --threshold <val>     Default threshold" << std::endl;
}

int main(int argc, char* argv[]) {
    bool ui_mode = true; // Default to UI
    SearchParams params = {(char*)"src", (char*)"*", 0.5f, (char*)"results.txt", false};

    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-h") == 0 || strcmp(argv[i], "--help") == 0) {
            print_usage();
            return 0;
        } else if (strcmp(argv[i], "-n") == 0 || strcmp(argv[i], "--noui") == 0) {
            ui_mode = false;
        } else if (strcmp(argv[i], "-d") == 0 || strcmp(argv[i], "--directory") == 0) {
            if (i + 1 < argc) params.inputDir = argv[++i];
        } else if (strcmp(argv[i], "-p") == 0 || strcmp(argv[i], "--pattern") == 0) {
            if (i + 1 < argc) params.pattern = argv[++i];
        } else if (strcmp(argv[i], "-t") == 0 || strcmp(argv[i], "--threshold") == 0) {
            if (i + 1 < argc) params.threshold = atof(argv[++i]);
        }
    }

    const char* paths[] = {
        "src/main.c",
        "src/indexer.c",
        "src/cli.c",
        "include/indexer.h",
        "README.md"
    };
    int num_paths = 5;

    if (ui_mode) {
        run_tui_wrapper(paths, num_paths, params);
    } else {
        run_cli_loop((char**)paths, num_paths);
    }
    
    return 0;
}
