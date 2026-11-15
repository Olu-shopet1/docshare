<!-- AADLC-TEMPLATE: replace every [bracket] for this agent, then delete this line -->
# Runbook: runaway or misbehaving agent

Owner: [Name] · Escalation: [Name, contact] · Applies to: [agent]

Triggers: budget breach, HIGH drift deviation, missed job check-in, guardrail spike, user report.

1. **Contain** - disable the agent's gateway key or virtual key; pause schedules. Target: [15] minutes.
2. **Preserve** - export traces and logs for the affected runs before retention removes them.
3. **Diagnose** - compare the run with its baseline: which tool, domain or sequence deviated, and when.
4. **Check for injection** - review every input the agent read just before the deviation (emails, pages, files, tool outputs).
5. **Fix and re-gate** - fix the cause, add an evaluation that reproduces it, and pass AADLC stages 3-4 again.
6. **Restore** - re-enable with a lower budget for [7] days, then return to normal limits if clean.
7. **Record** - incident record, root cause, new test, owner sign-off; raise lessons at the monthly review.
