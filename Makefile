# Define variables
CC = c++
CFLAGS = -Wall -I./csrc
OBJ_DIR = obj
SRC_DIR = csrc
TARGET = LSD

# List of source files
SRCS = $(filter-out $(SRC_DIR)/test_logic.c $(SRC_DIR)/ui.c, $(wildcard $(SRC_DIR)/*.c))
OBJS = $(patsubst $(SRC_DIR)/%.c, $(OBJ_DIR)/%.o, $(SRCS))

# Default target
all: $(TARGET)

# Rule to build the target
$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^ ui_wrapper.o

# Rule to compile source files into object files
$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c
	mkdir -p $(OBJ_DIR)
	$(CC) $(CFLAGS) -c $< -o $@ 

# Clean up build artifacts
clean:
	rm -rf $(OBJ_DIR) $(TARGET)

# Run the application
run: $(TARGET)
	./$(TARGET)

# Generate dependencies
depend:
	$(CC) -MM $(SRCS) > Makefile.depend

install:
	cp $(TARGET) /bin
	cp $(TARGET) /usr/bin

# Include dependencies if they exist
-include Makefile.depend