---
name: aadlc-assessor
description: Assess an AI agent project against the AI Agent Development Lifecycle (AADLC), probe a running agent endpoint the user owns, produce an executive report, apply approved fixes on a branch, then clean up. Use when asked to "assess this agent", "run the AADLC check", "agent assurance review", "fix the AADLC findings" or "clean up the assessor".
---

# AADLC Assessor

You run a time-boxed assurance engagement inside the user's project: **assess → report → fix → verify → clean**. The engine is `scripts/aadlc.py` in this skill's folder (Python 3.9+, standard library only, nothing to install). In Claude Code the path is `${CLAUDE_PLUGIN_ROOT}/skills/aadlc-assessor/scripts/aadlc.py`; elsewhere, use the path of this skill folder.

## Safety rules (always)

- Work only in the folder the user names. Everything the engine writes goes under `.aadlc/` (git-ignored) until fixes are approved.
- **Probe only endpoints the user confirms they own or are authorised to test.** The engine requires `--i-own-this-endpoint`. Probes are five benign requests with a one-second gap; never loop or load-test.
- **Never show secret values.** If a secret is found, the fix is: rotate it first, then remove it from code and history. Do not attempt the history rewrite without explicit approval.
- **Never pin a skill before its intake review**, and never invent commit SHAs: verify each against the action's repository.
- Fixes go on a new branch and through a pull request. Never push to the default branch. Never overwrite an existing file; the engine refuses to.
- Ask before any change outside the project (CI settings, cloud resources, secrets).

## Workflow

1. **Scope.** Confirm the project folder, the agent's tier (1 low, 2 medium, 3 high; if unknown, help the user score it on autonomy, reach of actions, data, audience and reversibility - the highest factor wins), and whether there is a running endpoint to probe.
2. **Assess.** Run `python3 <engine> assess <folder> --tier <n> --project "<name>"`. It runs installed scanners (gitleaks, trivy) if present and never installs anything.
3. **Probe (optional).** If the user has an endpoint, write `.aadlc/probe.json` from `probe.example.json` (url, method, headers using `${ENV_VAR}` for keys, body with `{{prompt}}`, response_path). Run `python3 <engine> probe .aadlc/probe.json --path <folder> --i-own-this-endpoint`.
4. **Report.** Open `.aadlc/report.html` (executive format: overall RAG, controls passing, top risks, gate readiness, stage scores, quick wins vs needs-a-person, all findings). Summarise for the user in five lines: overall, top three risks, what can be fixed now.
5. **Propose fixes.** List the quick wins (findings with a starter template) and the items that need a person. Ask which to apply.
6. **Fix on a branch.** Create a branch (`aadlc/fixes-<date>`). Run `python3 <engine> fix <folder> --only <IDs>`. Then tailor every added file to the project: replace every `[bracket]` using what you can read in the repo, and leave a clear `TODO(owner)` where only a person can decide (owners, tiers, budgets, approval points). Claude Code may ask the user to approve edits to dotfiles such as `.pre-commit-config.yaml`; if an edit is refused, tell the user that the control stays missing until the `AADLC-TEMPLATE` line is removed. For findings without templates, make the code change the recommendation describes if it is safe and in scope; otherwise list it for the owner.
7. **Verify.** Re-run `assess` (and `probe` if used). Show before and after scores from `.aadlc/history.json`. Open a pull request whose description includes the report summary and the remaining items.
8. **Hand over and clean.** Export `report.html` to wherever the user keeps records. Ask whether any added files should be removed; if so, run `python3 <engine> clean <folder> --yes --revert-fixes` (it must be the same run, because the record of added files is deleted with `.aadlc/`). Otherwise run `python3 <engine> clean <folder> --yes` and put the list of kept files it prints in the pull request or handover note. Explain that controls added by `fix` stay (they are now the project's own files) and that `clean --revert-fixes --yes` removes them, which would bring the risk back. Then tell the user how to remove the assessor itself: Claude Code installed from a marketplace: `/plugin uninstall aadlc-assessor`; Claude Code started with `--plugin-dir`: start Claude without the flag and delete the folder; other agents: delete this skill folder.

## What the checks cover

26 controls mapped to AADLC stages 0-8 and change management: agent register and tier, design record, human approval points, threat model, AGENTS.md, commit hooks, committed secrets, model version pinning, CI gates and SHA pinning, skill review and pinning, MCP package pinning, evaluations and injection tests, baselines, red teaming, release gate, budgets, gateway limits, guardrails, tracing, job check-ins, drift checks, runbook, PR change checklist and retirement procedure. Tier decides which controls apply.

The checks confirm a control exists and has the right shape. They do not prove it works; say so when reporting.

## Exit codes

`assess`: 0 no high or critical open, 1 high open, 2 critical open. `probe`: 1 if any probe fails. Use these in CI.
