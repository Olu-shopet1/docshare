# Gap-Signal Outreach: Test on 3 Recent Work Tasks

**Purpose:** See whether the gap-signal method (from `gap-signal-outreach-playbook.md`) works on real recent work, and map how it combines with your existing Claude skills.

**Tasks tested** (most recent work found in your Notion, Sep–Oct 2025):

| # | Task (Notion) | Date | What it was |
|---|---|---|---|
| T1 | UK Healthcare SecOps Briefing Suite | 30 Sep 2025 | 20-slide board, incident and technical briefing built around the Synnovis 2024 ransomware attack (Qilin), NHS DSPT, CQC, M365 risk |
| T2 | CVE Prioritisation & Vulnerability Management Framework | 1 Oct 2025 | 13-slide deck on CVSS + EPSS + CISA KEV prioritisation with fix/defer/accept scenarios |
| T3 | SOC Transition & Operation Takeover | 26 Sep 2025 | 12-slide deck on handing over SOC operations: risk, knowledge transfer, parallel running, KPIs |

> **Note:** These tasks are about 13 months old, so the signals below are past their same-day window. The test shows how the method works. For live use, run the skill on *today's* equivalent signal. Organisation names marked **(to verify)** come from public knowledge and need checking before you use them.

---

## T1: UK Healthcare SecOps Briefing → gap-signal test

**Signal:** The June 2024 Synnovis ransomware attack (Qilin group). It disrupted pathology services for King's College Hospital and Guy's and St Thomas' NHS Foundation Trusts and GP services in south-east London. There were NHS England statements and NCSC involvement.

**Named:** Synnovis (a pathology partnership between SYNLAB and the two trusts), King's College Hospital NHS FT, Guy's and St Thomas' NHS FT, NHS England, NCSC.

**Gap list (ranked):**

| # | Segment / organisation | Why they'd feel left out or exposed | Rel | Status | Buy | Access | Fit | Total |
|---|---|---|---|---|---|---|---|---|
| 1 | Other NHS pathology networks using outsourced or joint-venture pathology (to verify) | The same operating model was hit; boards will ask "could this be us?" | 5 | 4 | 3 | ? | 5 | 17+ |
| 2 | NHS trusts that rely on a single critical supplier for diagnostics or imaging | The same concentration risk; affects DSPT and supplier assurance | 5 | 3 | 3 | ? | 5 | 16+ |
| 3 | Private pathology and diagnostics providers serving the NHS (to verify) | Being "the next Synnovis" is a commercial risk to their contracts | 4 | 4 | 4 | ? | 4 | 16+ |
| 4 | Integrated Care Boards (ICBs) | They have system-level resilience duties but no public voice in the response | 4 | 3 | 2 | ? | 4 | 13+ |

**Opener (TPRM angle):**
> Hi [Name], the Synnovis incident showed how one pathology supplier can take down services across several trusts. How confident is your board in its visibility of critical diagnostic suppliers? I've built board and SOC briefings on exactly this incident and would be glad to compare notes.

**Verdict: ✅ Strong fit.** Your existing deck *is* the "something useful" offer for the day 3–5 follow-up, so the method plugs straight in.

---

## T2: CVE Prioritisation Framework → gap-signal test

**Signal:** A new entry in the CISA KEV catalogue for a widely used edge product (VPN, firewall or file transfer), plus an NCSC alert.

**Named:** The vendor, CISA, NCSC, and any organisations publicly confirmed as affected.

**Gap list (ranked):**

| # | Segment | Why | Rel | Status | Buy | Access | Fit | Total |
|---|---|---|---|---|---|---|---|---|
| 1 | Your existing vendor portfolio running that product (use the Bitsight / CVE skills) | Direct exposure; you can show evidence the same day | 5 | 3 | 4 | 5 | 5 | 22 |
| 2 | Mid-size regulated firms (finance, utilities) with the product but no large in-house vulnerability team | They're exposed but not in the headlines; their CISO needs a board answer | 5 | 3 | 3 | ? | 5 | 16+ |
| 3 | Peers of any organisation publicly confirmed as compromised | Status anxiety: "they got hit, are we next?" | 4 | 5 | 3 | ? | 4 | 16+ |

**Opener:**
> Hi [Name], with [CVE] added to CISA KEV today, many teams are asking whether to patch now or defer. How are you prioritising it across your estate and third parties? I use a CVSS + EPSS + KEV decision framework and would be happy to share the one-page version.

**Verdict: ✅ Strongest fit.** KEV additions happen every week, so this lane gives you a steady flow of signals. Your framework deck is the follow-up asset.

---

## T3: SOC Transition & Takeover → gap-signal test

**Signal:** A public contract award for managed SOC/MDR services (Find a Tender or Contracts Finder), *or* news of an MSSP being acquired or merged.

**Named:** The buyer, the winning MSSP, and the outgoing provider if one is stated.

**Gap list (ranked):**

| # | Segment | Why | Rel | Status | Buy | Access | Fit | Total |
|---|---|---|---|---|---|---|---|---|
| 1 | The buying organisation itself (its transition is about to start) | The handover is the riskiest period, and an independent transition assurer adds value | 5 | 2 | 4 | ? | 5 | 16+ |
| 2 | Customers of an acquired MSSP | Service changes and staff churn lead to "will our SOC coverage drop?" | 4 | 3 | 4 | ? | 5 | 16+ |
| 3 | Unsuccessful bidders | "Why did they win?" They want bid-improvement support | 3 | 5 | 3 | ? | 3 | 14+ |

**Opener:**
> Hi [Name], congratulations on the [contract] award. SOC handovers are usually the riskiest phase: knowledge transfer, parallel running, gaps in detection coverage. How are you planning the cutover? I've built a transition and takeover framework and would be glad to share it.

**Verdict: 🟡 Moderate fit.** Award signals are less frequent and the same-day urgency is weaker. It works best as a **transition assurance** offer, not as exclusion anxiety.

---

## Summary matrix: how the skills apply across your work

### A. Gap-signal method × each task

| | T1 Healthcare SecOps | T2 CVE Prioritisation | T3 SOC Transition |
|---|---|---|---|
| **Main signal** | Major sector incident (Synnovis) | CISA KEV / NCSC alert | MSSP contract award or acquisition |
| **How often signals appear** | Monthly or quarterly | **Weekly** | Monthly |
| **Who to target** | Trusts and pathology providers in the same model | Organisations running the affected product | The buyer, customers of the acquired MSSP, losing bidders |
| **Main motivation** | "Could this be us?" plus regulator scrutiny | Urgent exposure needing a board answer | Handover risk and status |
| **Asset you already have** | 20-slide briefing suite | 13-slide framework deck | 12-slide transition deck |
| **First paid offer** | Critical supplier resilience review | Exposure snapshot + patch triage | Independent transition assurance |
| **Same-day urgency** | High | **Very high** | Medium |
| **Overall fit** | ✅ Strong | ✅ **Strongest** | 🟡 Moderate |

### B. Gap-signal skill × your other Claude skills

| Your skill | Role in a gap-signal play | T1 | T2 | T3 |
|---|---|---|---|---|
| `gap-signal-outreach` (new) | Spot the signal → find who's missing → draft openers | ✅ | ✅ | ✅ |
| `cve-vulnerability-tracker` | Turn a KEV signal into a tracked exposure list | – | ✅ Core | – |
| `bitsight-cve-vendor-exposure` | Prove which of your vendors are exposed, the same day | ✅ | ✅ Core | – |
| `bitsight-assess-supply-chain-resilience` | Sector-level view for the follow-up note | ✅ | ✅ | – |
| `tprm-risk-ownership-triage` / `vmo2-tprm-review` | Paid follow-on: supplier assurance review | ✅ Core | ✅ | – |
| `incident-response-playbook` | Paid follow-on after a sector incident | ✅ Core | ✅ | – |
| `soc-capability-assessor` | Paid follow-on: SOC readiness or transition assurance | ✅ | – | ✅ Core |
| `bid-response-writer` | Losing-bidder angle; your own bids after awards | – | – | ✅ |
| `executive-reporting` / `pptx` | Build the day 3–5 one-pager or board brief | ✅ | ✅ | ✅ |
| `ceo-advisor` / `strategic-issue-matrix` | Read the status dynamics ("why is the CEO writing an op-ed?") | ✅ | – | ✅ |
| `claims-vs-reality` | After a vendor breach, check its assurance pack against what happened | ✅ | ✅ | – |

### C. Recommended operating rhythm

| Cadence | Lane | Action | Time |
|---|---|---|---|
| Weekly (Mon) | T2 CVE / KEV | Check new KEV entries → Bitsight exposure → 3 openers | 30 min |
| As it happens | T1 Sector incidents | Same-day gap list → openers; send the briefing asset on day 3–5 | 45 min |
| Fortnightly | T3 Contract awards | Scan Find a Tender for SOC/MDR awards → transition assurance openers | 20 min |
| Monthly | All | Review the tracker: reply rate, meetings, wins → drop the weakest lane | 30 min |

---

## Findings

1. **The method works best where signals are frequent and urgent.** CVE/KEV (T2) is the best lane to start with.
2. **You already have the "something useful" assets.** All three decks can become day 3–5 follow-up material with little rework.
3. **The skill is for business development, not delivery.** It finds and opens doors. Your existing skills (TPRM, Bitsight, SOC, IR) do the paid work afterwards.
4. **One improvement to the skill:** add an "existing asset" step that links each signal to an asset you already have. ✅ Added to `SKILL.md`.
5. **Unknown access scores** (`?`) are the biggest gap. Keeping a peer map with your existing relationships would make the ranking much sharper.
