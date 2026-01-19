# vzic Update Guide

To update the vzic dependency (including the Makefile):

1.  **Check IANA Version:** Find the latest IANA release (e.g., "2025c") as this gets also updated in this flow (there is no vzic-only update process).
2.  **Run Script from root:** ```bash
    sudo sh scripts/update-tzdata.sh 2025c true
    ```
    *This script clones the libical repository, carves out the vzic part, downloads the IANA data, compiles the C tools, runs the generation, and updates the JSON files.*
3.  **Verify:** Run `npm test` to ensure offsets are correct.
4.  **Commit:** Commit the changes.
