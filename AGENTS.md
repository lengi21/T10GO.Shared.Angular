# T10GO Shared Packages guidance

- Publish private packages only under the `@lengi21` scope through GitHub Packages.
- Treat every exported type or component as a cross-repository contract; use semantic versioning and avoid breaking changes without an explicit migration plan.
- Extract source from Shell incrementally. Do not create direct imports from sibling repositories.
- Publish `@lengi21/federation-contracts` first, then design system, then the app-neutral environment loader.
- Update `README.md` and `HISTORY.md` whenever package contracts or publishing workflow changes.
