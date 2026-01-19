# Data Update Guide

To update the timezone data to the latest IANA version:

1.  **Check Version:** Find the latest IANA release (e.g., "2025c").
2.  **Run Script from root:** ```bash
    sudo sh scripts/update-tzdata.sh 2025c
    ```
    *This script downloads the data, compiles the C tools, runs the generation, and updates the JSON files.*
3.  **Verify:** Run `npm test` to ensure offsets are correct.
4.  **Commit:** Commit the changes.