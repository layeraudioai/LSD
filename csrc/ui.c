#include "./ncurses.h"
#include <stdio.h>
#include <string.h>
#include "indexer.h"

void run_ui_mode(char** paths, int num_paths) {
    initscr();
    cbreak();
    noecho();
    keypad(stdscr, TRUE);
    curs_set(0);

    mvprintw(0, 0, "LSD TUI MODE - Press 'q' to exit");
    mvprintw(2, 0, "Indexing...");
    refresh();

    // Simple search
    SearchParams params = {"src", "indexer", 0.5f, "results.txt", false};
    int num_results = 0;
    SearchResult* results = search_paths(paths, num_paths, params, &num_results);
    
    mvprintw(4, 0, "Found %d results:", num_results);
    for(int i=0; i<num_results; i++) {
        mvprintw(5 + i, 0, "- %s", results[i].fileName);
    }
    
    refresh();
    
    int ch;
    while((ch = getch()) != 'q') {
        // Wait for 'q'
    }

    free_search_results(results, num_results);
    endwin();
}
