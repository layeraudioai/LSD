#ifndef CLI_H
#define CLI_H

#include "indexer.h"

void run_cli_loop(char** initial_paths, int num_paths);
void print_help();
void execute_search(char** paths, int num_paths, char* args);

#endif
