<!-- AADLC-TEMPLATE: replace every [bracket] for this agent, then delete this line -->
# Threat model (STRIDE): [Agent name]

Scope: [agent, tools, connectors, data stores, users] · Reviewed by: [Name] · Date: [YYYY-MM-DD]

Each row maps a threat to its control (AADLC stage / runbook step). Rate likelihood and impact 1-5.

| # | Threat | STRIDE | Example | L | I | Control | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Prompt injection via content the agent reads | Tampering / Elevation | Hidden instruction in an email or web page | [ ] | [ ] | Injection evals (stage 3), guardrails (stage 5), tool allow-list | [ ] |
| T2 | Tool misuse | Elevation | Agent uses a delete or send tool outside its task | [ ] | [ ] | Least privilege, human approval points, baselines | [ ] |
| T3 | Over-privileged connectors | Elevation / Info disclosure | Connector token can read all mailboxes | [ ] | [ ] | Scoped service identities, design review | [ ] |
| T4 | Supply chain (skills, MCP servers, packages) | Tampering | Malicious skill or unpinned MCP package | [ ] | [ ] | Skill scan, intake review, pinning, SBOM | [ ] |
| T5 | Memory poisoning | Tampering | Injected "fact" persists across sessions | [ ] | [ ] | Memory write rules, review, retention | [ ] |
| T6 | Runaway cost or loop | Denial of service | Same tool called repeatedly, token overrun | [ ] | [ ] | Gateway limits, budgets.yaml, drift check | [ ] |
| T7 | Silent scheduled-job failure | Denial of service | Nightly refresh stops; data goes stale | [ ] | [ ] | Check-ins with missed-run alerts | [ ] |
| T8 | [Add agent-specific threats, e.g. from the OWASP Agentic Top 10] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
