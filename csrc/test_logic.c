#include <stdio.h>
#include <stdlib.h>
#include "indexer.h"

int main() {
    char* paths[] = {
        "src/main.c",
        "src/indexer.c",
        "include/indexer.h",
        "README.md"
    };
    int num_paths = 4;

    printf("Building tree...\n");
    Node* root = build_file_tree(paths, num_paths);
    printf("Tree built successfully.\n");

    printf("Searching...\n");
    SearchParams params = {"src", "main", 0.5f, "results.txt", false};
    int num_results = 0;
    SearchResult* results = search_paths(paths, num_paths, params, &num_results);
    
    printf("Found %d results:\n", num_results);
    for(int i=0; i<num_results; i++) {
        printf("- %s (Score: %.2f)\n", results[i].path, results[i].score);
    }

    free_search_results(results, num_results);
    free_tree(root);
    printf("Tests passed.\n");
    return 0;
}
