# T10GO Shared Packages — Technical History

## 2026-08-25 — Shared input, button, and card primitives

**Decision:** Added text and number controls based on `T10goInputBase<TValue>`, a semantic native-button directive, and an elevated card component to the Design System.

**Impact:** Authentication and future product screens can use the same accessible field shell, form-control integration, surface, and action styling. These primitives release in `@lengi21/t10go-design-system@0.1.3`.

## 2026-08-25 — Shared Angular authentication client

**Decision:** Added `@lengi21/t10go-auth-client`, which provides a session-only token store, Authorization Code + PKCE browser flow, shared protected-route guard, and opt-in Bearer-token interceptor.

**Impact:** Shell owns account screens and identity while every federated application can use the same session and API-authentication behavior without copying auth code.

## 2026-08-24 — User-selectable palettes

**Decision:** Added persistent palette selection to `ThemeService` and a reusable swatch dropdown that renders palette names with visible color strips.

**Impact:** Applications can offer multiple branded palettes without duplicating theme logic or sacrificing light/dark mode support.

**Release:** Published `0.1.1` already contained the initial palette refresh, so the swatch-picker additions are released as `0.1.2` rather than overwriting the immutable version.

## 2026-08-24 — Indigo and teal application palette

**Decision:** Replaced the warm brown/orange palette with indigo primary actions, teal support and focus colors, and neutral slate surfaces in light and dark themes.

**Impact:** The shared Design System has a more focused, professional management-application appearance while retaining accessible text and status contrast.

## 2026-08-24 — GitHub Packages workspace established

**Decision:** T10GO shared packages are published from this repository to GitHub Packages under the `@lengi21` scope.

**Reason:** Shell and Wedding Manager are independent repositories and must consume versioned shared code rather than local cross-repository paths.

**Impact:** `@lengi21/federation-contracts` is the first publishable package. Design system and environment loader extraction follows in separate, compatibility-preserving steps.

## 2026-08-24 — Angular packages extracted

**Decision:** The Design System and environment-loader packages are published as Angular partial-compilation libraries with Angular 22 peer dependencies.

**Impact:** Shell and federated remotes can consume the same versioned components, tokens, and runtime configuration API.

**Release rule:** This repository is the source of truth for publishable shared code. Every release requires a new package version; published versions are immutable.

## 2026-08-24 — Workflow package-path correction

**Fix:** The GitHub Actions publish command now prefixes Angular build output directories with `./`, ensuring npm treats them as local packages rather than Git repository names.
