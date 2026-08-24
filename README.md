# T10GO Shared Packages

Private packages shared by the T10GO Shell and federated remote applications. Packages are published to GitHub Packages under the `@lengi21` scope.

## Packages

| Package | Status | Purpose |
| --- | --- | --- |
| `@lengi21/federation-contracts` | Publishable | Shared navigation, route, and federation-manifest TypeScript contracts |
| `@lengi21/t10go-design-system` | Publishable | Reusable Angular components, theme tokens, navigation, and form foundations |
| `@lengi21/t10go-env-loader` | Publishable | App-neutral runtime configuration loader |

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

1. Update the package version in its `package.json`.
2. Run `pnpm install` and `pnpm build` locally.
3. Push the version change.
4. Run the **Publish package** GitHub Actions workflow manually and select the package.

Do not overwrite an existing package version. Use semantic versioning and upgrade Shell/remote dependencies deliberately.

## Extraction plan

1. Publish and consume `@lengi21/federation-contracts` in Shell and Wedding Manager.
2. Publish the design system and environment loader without changing their public APIs.
3. Consume shared packages from all applications through explicit version upgrades.

Record package-contract decisions in [HISTORY.md](HISTORY.md).
