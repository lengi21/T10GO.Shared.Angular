# T10GO Shared Packages

Private packages shared by the T10GO Shell and federated remote applications. Packages are published to GitHub Packages under the `@lengi21` scope.

## Packages

| Package | Status | Purpose |
| --- | --- | --- |
| `@lengi21/federation-contracts` | Publishable | Shared navigation, route, and federation-manifest TypeScript contracts |
| `@lengi21/t10go-design-system` | Publishable | Reusable Angular components, theme tokens, navigation, and form foundations |
| `@lengi21/t10go-env-loader` | Publishable | App-neutral runtime configuration loader |

## Theme palette

The Design System uses a calm indigo-and-teal palette: indigo signals primary actions and navigation, teal supports focus and secondary actions, and neutral navy/slate surfaces keep both themes legible in information-dense management screens. Theme values are CSS custom properties in `packages/t10go-design-system/src/styles/theme/`.

## Install in an application

Create a project `.npmrc` file:

```ini
@lengi21:registry=https://npm.pkg.github.com
```

Authenticate locally with a GitHub personal access token that has package read access, then install a package:

```bash
pnpm add @lengi21/t10go-design-system @lengi21/t10go-env-loader
```

GitHub Actions uses `GITHUB_TOKEN` to publish packages and does not need a stored personal token.

## Publish a release

The source of truth for published shared code is this repository, not a copy in an application repository.

1. Change the source under `packages/t10go-design-system/src` or `packages/t10go-env-loader/src`.
2. Increase that package's `version` in its `package.json` (for example, `0.1.0` to `0.1.1`). GitHub Packages never permits overwriting a published version.
3. From this repository, run `pnpm install` and then `pnpm --filter @lengi21/<package-name> run build`.
4. Commit and push the source, version, and lockfile changes to the default branch.
5. Run the **Publish package** GitHub Actions workflow manually, selecting the changed package.
6. In Shell and Wedding Manager, update the dependency version with `pnpm update @lengi21/<package-name>` and commit the resulting lockfile.

For an urgent temporary change made in Shell's local library copy, copy the same change into this repository before publishing. Do not let the copies diverge; the recommended next migration is to make Shell consume these packages too.

Do not overwrite an existing package version. Use semantic versioning and upgrade Shell/remote dependencies deliberately.

## Extraction plan

1. Publish and consume `@lengi21/federation-contracts` in Shell and Wedding Manager.
2. Publish the design system and environment loader without changing their public APIs.
3. Consume shared packages from all applications through explicit version upgrades.

Record package-contract decisions in [HISTORY.md](HISTORY.md).
