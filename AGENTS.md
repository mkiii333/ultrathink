# Repository Guidelines

## Project Structure & Module Organization
- `docs/` stores the canonical planning set: `prd.md`, product briefs, front-end specs, and any sharded epics once generated.
- `web-bundles/` contains ready-to-load agent bundles; subfolders split individual roles (`agents/`), cross-functional teams (`teams/`), and optional domain packs (`expansion-packs/`).
- `.bmad-core/` is the method brain with tasks, workflows, templates, and data references; adjust cautiously because every agent bundle loads from here.
- `.claude/` and `.cursor/` hold IDE configuration for orchestrating agents; keep diffs intentional so collaborators inherit the same shortcuts.
- Generated QA assets should live under `docs/qa/` (create the folder as needed) to match `core-config.yaml`.

## Build, Test, and Development Commands
- Planning cycle: `@sm *draft` creates the next story from approved artefacts, while `@po *shard-doc docs/prd.md` maintains epics/stories alignment.
- Implementation: `@dev *develop-story docs/stories/<epic>/<story>.md` walks the developer checklist and enforces story file hygiene.
- Quality: `@qa *risk`, `@qa *design`, and `@qa *trace` document assessments in `docs/qa/assessments/` with timestamped filenames; always finish with `@qa *review` then `@qa *gate`.
- When pulling a new bundle variant, reload agents with the web CLI to ensure fresh dependencies before running commands.

## Coding Style & Naming Conventions
- Markdown files use ATX headings, sentence-case titles, and wrap around 100 characters; favour concise bullet lists over long prose.
- YAML under `.bmad-core/` is two-space indented, lower-kebab keys, and quoted strings only when needed.
- Agent bundle filenames stay lowercase kebab-case (`dev.txt`, `team-fullstack.txt`); mirror that when adding new roles.
- Keep embedded resource tags exactly as `==================== START/END: <path> ====================` so loaders can parse them.

## Testing Guidelines
- Treat QA artefacts as the test suite: run `@qa *risk` for high-risk work, `@qa *design` before coding, and `@qa *trace` mid-implementation to confirm coverage.
- Store outputs alongside the related story (`docs/qa/assessments/{epic}.{story}-*.md`) and reference them from the story file.
- Before requesting review, confirm linting/formatting passes locally (e.g., `npx markdownlint-cli '**/*.md'` if available) and resolve agent warnings.
- Quality gates (`docs/qa/gates/`) require up-to-date status; do not mark stories complete without a fresh gate entry.

## Commit & Pull Request Guidelines
- This snapshot ships without git metadata; adopt Conventional Commits (`docs: add qa guidance`) so histories stay searchable.
- Squash noisy changes and ensure each commit touches related artefacts (story, QA output, bundle) together.
- Pull requests should summarise scope, link the triggering story, and attach key artefacts (PRD section, QA report, screenshots if UI-facing).
- Request QA sign-off for changes touching `.bmad-core/` or `web-bundles/` because they affect multiple agents.
