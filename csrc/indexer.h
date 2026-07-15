#ifndef INDEXER_H
#define INDEXER_H

#include <stdbool.h>

typedef struct Node {
    char name[256];
    char path[1024];
    bool is_directory;
    struct Node** children;
    int num_children;
    int depth;
    long size; // File size in bytes
} Node;

typedef struct {
    char* inputDir;
    char* pattern;
    float threshold;
    char* outputFile;
    bool searchFileNamesOnly;
} SearchParams;

typedef struct {
    char* path;
    char* fileName;
    float score;
    long size;
    char* extension;
} SearchResult;

Node* create_node(const char* name, const char* path, bool is_directory, int depth);
Node* build_file_tree(char** paths, int num_paths);
void free_tree(Node* node);
SearchResult* search_paths(char** paths, int num_paths, SearchParams params, int* num_results);
void free_search_results(SearchResult* results, int num_results);

#endif
