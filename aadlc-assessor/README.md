# AADLC Assessor v0.1.1

Assess an AI agent project against the **AI Agent Development Lifecycle (AADLC)**, probe a running agent endpoint you own, get an **executive report**, apply fixes on a branch, then **remove the assessor** so nothing is left behind except the controls you chose to keep.

## What is in the box

```
aadlc-assessor/
├── .claude-plugin/plugin.json        Claude Code plugin manifest
├── commands/                          /aadlc-assessor:aadlc-assess, :aadlc-fix, :aadlc-clean
└── skills/aadlc-assessor/             Portable Agent Skill (SKILL.md standard)
    ├── SKILL.md                       The assess → report → fix → verify → clean procedure
    ├── scripts/aadlc.py               Engine: Python 3.9+, standard library only
    ├── templates/                     Starter files for missing controls
    └── probe.example.json             Endpoint probe configuration
```

One folder, three ways to run it. Pick the one that matches the client.

| Client uses | Install | Run | Remove |
| --- | --- | --- | --- |
| **Claude Code** | `claude --plugin-dir ./aadlc-assessor` (session only), or add to a marketplace and `/plugin install aadlc-assessor` | `/aadlc-assessor:aadlc-assess`, `/aadlc-assessor:aadlc-fix`, `/aadlc-assessor:aadlc-clean` | Installed: `/plugin uninstall aadlc-assessor`. With `--plugin-dir`: start Claude without the flag |
| **Codex, Copilot, Cursor, Gemini CLI or another SKILL.md agent** | Copy `skills/aadlc-assessor` into the agent's skills folder (for example `.agents/skills/`) | Ask: "run the AADLC assessor on this repo" | Delete the folder |
| **No AI agent / CI** | Nothing: needs only `python3` | `python3 skills/aadlc-assessor/scripts/aadlc.py assess . --tier 2` | Delete the folder |

Claude Code puts the plugin name in front of each command, so type `/aadlc-assessor:aadlc-assess`, not `/aadlc-assess`. Typing `/aadlc` and pressing Tab shows them.

With an AI agent you get the full loop including tailored fixes and a pull request. With the plain CLI you get the assessment, report, starter templates and clean-up; a person tailors the templates.

## Commands

```
python3 aadlc.py assess <folder> --tier 1|2|3 [--project NAME] [--no-external]
python3 aadlc.py probe  <probe.json> --path <folder> --i-own-this-endpoint
python3 aadlc.py report <folder>
python3 aadlc.py fix    <folder> [--only AADLC-05 AADLC-18] [--dry-run]
python3 aadlc.py clean  <folder> --yes [--revert-fixes]
```

Exit codes: `assess` returns 0 (no high/critical), 1 (high open) or 2 (critical open); `probe` returns 1 if any probe fails.

## What it checks

26 controls across AADLC stages 0-8 and change management, scaled by tier. If `gitleaks` or `trivy` are already installed it runs them too; it never installs anything.

The **probe** sends five benign requests to an endpoint you configure: a functional check, a direct injection, an indirect injection hidden in content, an exfiltration request and a system-prompt disclosure attempt. It looks for a canary token in replies. Use only on endpoints you own or are authorised to test.

## What it leaves behind

- `.aadlc/` (git-ignored): `report.html`, `report.md`, `results.json`, `history.json`, `manifest.json`. **Removed by `clean`.**
- Files added by `fix` (for example `ops/budgets.yaml`, `.github/workflows/agent-assurance.yml`). These are the project's controls and are **kept** by `clean`, because deleting them brings the risk back. `clean --revert-fixes --yes` removes them if the client insists. Use `--revert-fixes` in the **same run** as clean: the list of added files lives in `.aadlc/manifest.json`, so it is gone once `.aadlc/` is removed. Clean prints the list and an `rm` command so you can keep it with the report.

## Limits

- Checks confirm that a control exists and has the right shape. They do not prove it works; the gates and probes in the pipeline do that over time.
- Secret detection uses common patterns; gitleaks remains the primary control.
- Workflow action SHAs in the template were current when generated. Verify and update them before adopting.
- Templates are starting points: every `[bracket]` must be filled before merge.
- Secret detection also scans untailored template files, so a secret cannot hide behind the `AADLC-TEMPLATE` marker.
- Claude Code asks for permission before editing some dotfiles (for example `.pre-commit-config.yaml`). Approve the prompt, or delete the `AADLC-TEMPLATE` line yourself; until then that control counts as missing.
