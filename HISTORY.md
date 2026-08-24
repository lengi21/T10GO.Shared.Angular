# T10GO Shared Packages — Technical History

## 2026-08-24 — GitHub Packages workspace established

**Decision:** T10GO shared packages are published from this repository to GitHub Packages under the `@lengi21` scope.

**Reason:** Shell and Wedding Manager are independent repositories and must consume versioned shared code rather than local cross-repository paths.

**Impact:** `@lengi21/federation-contracts` is the first publishable package. Design system and environment loader extraction follows in separate, compatibility-preserving steps.
