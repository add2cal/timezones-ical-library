# vzic Update Guide

Follow the prerequisites, clean-checkout checks, failure recovery and explicit validation sequence in the [data update guide](data_update.md). This is the same maintainer-only Linux flow, with an upstream vzic refresh added; there is no separate vzic-only generation path.

From the repository root, substitute the selected IANA release for `2026e`:

```bash
sudo sh scripts/update-tzdata.sh 2026e true
```

The `true` argument clones `libical/libical`, replaces `src/vzic/` with its vzic subtree (including the Makefile), retains the selected source file types and reapplies the compatibility edits encoded in `scripts/update-tzdata.sh`. The normal flow then downloads selected-release tzdata/matching tzcode, regenerates ICS/JSON/API output and certifies bundled offset coverage before source cleanup.

Keep persistent upstream adaptations in the updater so they survive the next refresh. Inspect the upstream C/Makefile diff as well as all generated data and certification. The updater does not run the npm tests/build; run the data update guide's checks afterward. Ordinary PR checks remain offline and do not refresh vzic or regenerate certification.
