#include "indexer.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

// Helper to estimate file size similar to app.js
long estimate_file_size(const char* filename) {
    // Simplified version for the port
    return 1024 + (rand() % 45000);
}

Node* create_node(const char* name, const char* path, bool is_directory, int depth) {
    Node* node = (Node*)malloc(sizeof(Node));
    strncpy(node->name, name, 255);
    node->name[255] = '\0';
    strncpy(node->path, path, 1023);
    node->path[1023] = '\0';
    node->is_directory = is_directory;
    node->children = NULL;
    node->num_children = 0;
    node->depth = depth;
    node->size = is_directory ? 0 : estimate_file_size(name);
    return node;
}

Node* build_file_tree(char** paths, int num_paths) {
    Node* root = create_node("root", "", true, 0);

    for (int i = 0; i < num_paths; i++) {
        char path_copy[1024];
        strncpy(path_copy, paths[i], 1023);
        path_copy[1023] = '\0';

        char* token = strtok(path_copy, "/\\");
        Node* current = root;
        char accumulated_path[1024] = "";

        while (token != NULL) {
            char* next_token = strtok(NULL, "/\\");
            bool is_file = (next_token == NULL);

            if (accumulated_path[0] != '\0') strncat(accumulated_path, "/", 1023);
            strncat(accumulated_path, token, 1023);

            Node* child = NULL;
            for (int j = 0; j < current->num_children; j++) {
                if (strcmp(current->children[j]->name, token) == 0) {
                    child = current->children[j];
                    break;
                }
            }

            if (child == NULL) {
                child = create_node(token, accumulated_path, !is_file, current->depth + 1);
                current->num_children++;
                current->children = (Node**)realloc(current->children, sizeof(Node*) * current->num_children);
                current->children[current->num_children - 1] = child;
            }

            current = child;
            token = next_token;
        }
    }
    return root;
}

void free_tree(Node* node) {
    if (node == NULL) return;
    for (int i = 0; i < node->num_children; i++) {
        free_tree(node->children[i]);
    }
    free(node->children);
    free(node);
}

// Simple fuzzy matching (simplified for C port)
float calculate_score(const char* target, const char* pattern) {
    if (strstr(target, pattern) != NULL) return 0.9f;
    return 0.0f; // Minimal fuzzy logic for start
}

SearchResult* search_paths(char** paths, int num_paths, SearchParams params, int* num_results) {
    SearchResult* results = NULL;
    int count = 0;

    for (int i = 0; i < num_paths; i++) {
        char* target = params.searchFileNamesOnly ? strrchr(paths[i], '/') : paths[i];
        if (!target) target = paths[i];
        else target++; // Skip '/'

        float score = calculate_score(target, params.pattern);
        if (score >= params.threshold) {
            count++;
            results = (SearchResult*)realloc(results, sizeof(SearchResult) * count);
            results[count - 1].path = strdup(paths[i]);
            results[count - 1].fileName = strdup(target);
            results[count - 1].score = score;
            results[count - 1].size = estimate_file_size(target);
            results[count - 1].extension = strdup("ext"); // Simplified
        }
    }
    *num_results = count;
    return results;
}

void free_search_results(SearchResult* results, int num_results) {
    for (int i = 0; i < num_results; i++) {
        free(results[i].path);
        free(results[i].fileName);
        free(results[i].extension);
    }
    free(results);
}
