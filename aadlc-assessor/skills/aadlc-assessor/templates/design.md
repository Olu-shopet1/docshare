<!-- AADLC-TEMPLATE: replace every [bracket] for this agent, then delete this line -->
# Design record: [Agent name]

Owner: [Name] · Risk owner: [Name] · Tier: [1|2|3] · Version: 0.1

## Purpose and users
[What the agent does, for whom, and what it must never do.]

## Key tasks
| Task | Input | Output | Baseline file |
| --- | --- | --- | --- |
| [Task 1] | [ ] | [ ] | evals/baselines/[task-1].json |

## Autonomy level
[Suggest only / acts with human approval for consequential steps / acts on its own.]

## Tools and connectors (least privilege)
| Tool or connector | Permission needed | Why | Narrower option considered |
| --- | --- | --- | --- |
| [e.g. Mail: send] | [send as service account, approved domains only] | [ ] | [ ] |

## Data
| Data | Read / stored in memory / sent out | Personal data? | Retention |
| --- | --- | --- | --- |
| [ ] | [ ] | [yes/no] | [ ] |

## Human approval points
| Consequential action | Approval required? | Who approves | How it is enforced |
| --- | --- | --- | --- |
| [Send email outside the organisation] | [Yes] | [Requesting user] | [Approval step in agent runtime] |

## Data protection
DPIA required: [yes/no] · Reference: [ ]

## Impact assessment (Tier 3)
Reference: [ ]
