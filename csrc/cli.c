#include "cli.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void print_help() {
    printf("LSD (Liquid Speed Directory) CLI Reference:\n");
    printf("====================================================\n");
    printf(" help             Print this help\n");
    printf(" lsdsearch <pattern> <threshold> <filenames_only>\n");
    printf("                  Search paths\n");
    printf(" exit             Exit the CLI\n");
    printf("====================================================\n");
}

void execute_search(char** paths, int num_paths, char* args) {
    char* pattern = strtok(args, " ");
    char* threshold_str = strtok(NULL, " ");
    char* filenames_only_str = strtok(NULL, " ");

    if (!pattern) {
        printf("Error: missing pattern.\n");
        return;
    }

    SearchParams params;
    params.pattern = pattern;
    params.threshold = threshold_str ? atof(threshold_str) : 0.5f;
    params.searchFileNamesOnly = filenames_only_str ? atoi(filenames_only_str) : 0;
    
    int num_results = 0;
    SearchResult* results = search_paths(paths, num_paths, params, &num_results);
    
    printf("Found %d results:\n", num_results);
    for(int i=0; i<num_results; i++) {
        printf("- %s (Score: %.2f)\n", results[i].path, results[i].score);
    }

    free_search_results(results, num_results);
}

void run_cli_loop(char** initial_paths, int num_paths) {
    char buffer[1024];
    printf("LSD CLI ready. Type 'help' for commands.\n");
    
    while (1) {
        printf("$ ");
        if (!fgets(buffer, 1024, stdin)) break;
        
        buffer[strcspn(buffer, "\n")] = 0; // Remove newline
        
        if (strcmp(buffer, "exit") == 0) break;
        if (strcmp(buffer, "help") == 0) print_help();
        else if (strncmp(buffer, "lsdsearch", 9) == 0) {
            execute_search(initial_paths, num_paths, buffer + 10);
        } else {
            printf("Unknown command: %s\n", buffer);
        }
    }
}
