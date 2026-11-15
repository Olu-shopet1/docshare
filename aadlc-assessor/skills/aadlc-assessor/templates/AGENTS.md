<!-- AADLC-TEMPLATE: replace every [bracket] for this agent, then delete this line -->
# AGENTS.md

## About this agent
[What the agent does, its tier, and where it runs.]

## Folder owners
| Folder | Owner |
| --- | --- |
| .agents/skills/ | [Name] |
| evals/ | [Name] |
| ops/ | [Name] |
| security/ | [Name] |

## Rules for agents and contributors
- Reuse before rebuild: check the Skill Register before creating a new skill or agent.
- Never commit secrets; use the secrets store.
- Every new or changed skill goes through intake review and pinning before use.
- Prompt, model, tool, data or autonomy changes re-enter the AADLC (see the PR template).
- Do not raise budgets or rate limits without owner approval (risk owner for Tier 3).
