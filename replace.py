#!/usr/bin/python3
import os
import argparse


def replace_text_in_files(directory, search_text, replace_text):
    """
    Recursively replaces a text string in all files within a directory and its subdirectories.

    :param directory: The root directory to search for files.
    :param search_text: The text string to search for.
    :param replace_text: The text string to replace with.
    """
    for root, _, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                # Read the content of the file
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                # Replace the search text with the replace text
                updated_content = content.replace(search_text, replace_text)

                # Write the updated content back to the file
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(updated_content)

                print(f"Updated file: {file_path}")
            except Exception as e:
                print(f"Failed to process file: {file_path} due to error: {e}")


if __name__ == "__main__":
    # Set up argument parser
    parser = argparse.ArgumentParser(
        description="Search and replace text in all files within a directory."
    )
    parser.add_argument("directory", type=str, help="The root directory to search.")
    parser.add_argument("search_text", type=str, help="The text to search for.")
    parser.add_argument("replace_text", type=str, help="The text to replace with.")

    # Parse arguments
    args = parser.parse_args()

    # Run the replacement function
    replace_text_in_files(args.directory, args.search_text, args.replace_text)
