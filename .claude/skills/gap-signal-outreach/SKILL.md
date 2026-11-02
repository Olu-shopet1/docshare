---
name: gap-signal-outreach
description: Turns a public announcement (government or regulator press release, NCSC/DSIT/ICO/Ofcom update, CISA KEV entry, supplier breach story, contract award notice, peer op-ed) into a same-day business development play for cybersecurity, GRC and TPRM advisory. Extracts who was named, identifies sector peers who were left out, scores them, and drafts short question-led openers. Use when the user says "gap-signal", "who wasn't mentioned", "who should I contact about this announcement", "turn this press release into leads", or pastes an announcement and asks for outreach targets.
---

# Gap-Signal Outreach

## Overview

When an authority announces something, it names a few organisations. Sector peers who weren't named spend that day asking "why them and not us?", and that urgency is the best moment to offer advisory help. This skill turns a single announcement into a ranked list of left-out organisations and draft openers, ready for the user to review the same day.

The full method, guardrails and templates are in `playbooks/gap-signal-outreach-playbook.md`. Read it if you need detail beyond this file.

## When to Use

- The user shares an announcement, its URL or text, and wants leads or outreach ideas
- The user asks who was left out of a policy announcement, a contract award or a breach story
- The user wants to map an announcement onto their lanes: GRC/regulation, TPRM/supply chain, CVE exposure, public sector/CNI bids, SOC, AI governance, or executive advisory

Don't use it for cold lead lists that aren't tied to a specific public signal.

## Inputs

1. **Signal:** pasted text or a URL. Fetch it if you can. If you can't, ask for the text.
2. **Lane:** which work area this falls under. If it isn't stated, infer it and say what you inferred.
3. **Peer map (optional):** the user's list of target organisations for that sector. If there isn't one, propose likely peers from public knowledge and label them **"to verify"**.

## Process

1. **Summarise the signal** in 2–3 lines: who announced it, what changed, the date, and which sector it affects.
2. **Extract the named list:** every organisation, trade body and person quoted or named, with their role in the announcement.
3. **Build the gap list:** 5–15 organisations that would reasonably expect to be named but weren't. Give a one-line reason for each, such as market share, regulated status, prior public stance, or use of the same supplier or technology.
4. **Score each one from 1 to 5** on Relevance, Status gap, Ability to buy, Access and Fit, for a total out of 25. Mark Access as "unknown" unless the user has told you about a relationship.
5. **Shortlist the top 3–5** and name the most likely internal sponsor role for each, for example CISO, Head of Risk, Head of Public Affairs or COO.
6. **Draft the openers:** under 80 words each, built around a question, and referring to the specific announcement. No pitching and no attachments. Use the templates in section 5 of the playbook.
7. **Match an existing asset:** ask the user (or check their notes) for a deck, framework or briefing they've already built on this topic, and use it as the follow-up offer. Suggest a related skill for the paid follow-on work, for example `bitsight-cve-vendor-exposure`, `tprm-risk-ownership-triage`, `soc-capability-assessor` or `incident-response-playbook`.
8. **Draft one follow-up** to send on day 3–5 that offers something useful, such as a one-page "what this means for [sector]" note, and outline that note in 5 bullets.
9. **Add a tracking row** for each shortlisted organisation in the playbook's section 8 format, so the user can paste it into their sheet.

## Output Format

```
## Signal
<summary + link>

## Named
| Organisation | Role in announcement |

## Gap list (ranked)
| # | Organisation | Why they'd expect to be named | Rel | Status | Buy | Access | Fit | Total |

## Shortlist & openers
### 1. <Org> — sponsor: <role>
<opener draft>

## Day 3–5 follow-up
<draft + 5-bullet one-pager outline>

## Tracker rows
<table rows>
```

## Guardrails (non-negotiable)

- Use **public information only**. Never use or ask for confidential client data to target others.
- **Don't use fear or overclaim.** Don't say or imply that a prospect has been breached, is non-compliant, or that the user has inside access to government.
- **Never suggest scanning or probing** a prospect's systems to create a reason to reach out. That's unauthorised testing and is illegal under the UK Computer Misuse Act.
- Remind the user about **PECR/UK GDPR** basics for B2B outreach: role-relevant content, a legitimate-interest basis, and an easy opt-out.
- Mark any organisation, contact role or fact you haven't verified as **"to verify"**. Never invent named individuals.
- **Draft only.** The user reviews and sends everything. Don't send messages yourself.

## Done When

- Every named organisation is listed, and the gap list gives a reason for each entry
- The shortlist has scores, a sponsor role and an opener for each organisation
- The follow-up and tracker rows are included
- Unverified items are clearly flagged
