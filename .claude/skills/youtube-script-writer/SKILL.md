---
name: youtube-script-writer
description: >
  Write a researched YouTube video script from a title (or from an existing brief/outline).
  Plans the sections, researches each one on the web, refines the plan with what it found,
  writes the script section by section to fit the video length, and optionally writes an
  SEO-friendly video description with chapter timestamps.

  USE THIS SKILL WHEN:
  - User wants a full script for a YouTube video, Short, TikTok or Reel
  - User says "write a script", "script this video", "YouTube script"
  - User has a brief or outline from /youtube-brief or /youtube-outline and wants the script

  TRIGGERS: "write a script", "YouTube script", "script this", "video script",
  "script for my video", "video description"
disable-model-invocation: true
---

# YouTube Script Writer

Based on the method of [youtube-script-writer](https://github.com/rahulanand1103/youtube-script-writer)
by Rahul Anand (MIT License), rebuilt to run inside Claude: no OpenAI or You.com keys are needed.

The method: **rough plan → research each section → improved plan → write each section → description.**
Research comes before writing so the script is built on real facts, not guesses.

---

## Step 0: Gather the Inputs

Ask for these in one short message (offer the choices; accept whatever the user gives):

| Input | Choices / examples |
|---|---|
| **Video title** | Any title or topic |
| **Video length** | Short / TikTok / Reel (15–60 sec) · 8–12 min · 15–20 min · 20–30 min · or a custom length |
| **Language** | English, French, … |
| **Tone** | A little humour · Facts only · Emotional · Inspirational · Educational · Entertaining · or describe your own |
| **Video description?** | Yes / No |

**If a brief or outline exists** (a `.md` file made by `/youtube-brief` or `/youtube-outline`, or one the
user pastes or points to): read it and use it. Its outcome, points to cover, proof and section plan
take priority over anything you would invent. Only ask for the inputs it doesn't already answer.

Repeat the inputs back as a small table and wait for the user to confirm.

---

## Step 1: Rough Plan

Create a first plan of the script, built for audience retention:

- A **working title** (thought-provoking and engaging)
- **Sections** that suit the length. As a guide: Shorts 3–4 sections, 8–12 min 5–7, 20–30 min 7–10
- For each section: a meaningful **section title**, a **description** of the ideas and points it covers,
  and a **time range** (e.g. `[0:00–0:45]`, `[0:45–3:00]`). Ranges must run on from each other with no
  gaps and add up to the full length
- Start with a strong hook in the first seconds

Rules:
- Script content only. No camera, editing or B-roll notes
- No separate "Conclusion" or "References" section (the final section can still land the message and
  include a call to action)

Show the plan and let the user adjust it before researching.

---

## Step 2: Research Each Section

For **each section**, run 1–3 web searches (WebSearch, or WebFetch for promising pages):
- Write factual, open-ended search queries about the section's subject. No tone words in queries
  (not "funny facts about…")
- Don't repeat a query already used for an earlier section
- Prefer recent, reliable sources. Note the date for anything time-sensitive

For each section, keep short research notes: the key facts, numbers, examples and quotes found, each with
its source link. For long videos with many sections, you may hand sections to a research subagent and
collect its notes.

Tell the user briefly what you found that changes or strengthens the plan.

---

## Step 3: Improved Plan

Rework the plan using the research:
- Sharpen section titles and descriptions so they reflect what was actually found
- Add, merge, drop or reorder sections if the research calls for it
- Re-check the time ranges so they still run on from each other and add up to the full length
- For each section, add **writer pointers**: 3–6 bullets saying exactly what to say, which facts and
  examples to use, and how to make it engaging, sized to the section's time

Same rules as Step 1 (script content only, no Conclusion/References section). Show the improved plan and
wait for the user to confirm.

---

## Step 4: Write the Script

Write each section in turn, in the chosen **language** and **tone**:

- **Fit the time.** Spoken pace is about **150 words per minute** (about 2.5 words per second). Size each
  section to its time range: for example, a 2-minute section is about 300 words
- **Stick to the research.** Use facts from the Step 2 notes. Don't invent statistics, quotes, dates
  or results. If a point has no source, say so to the user instead of making it up
- Follow the section's writer pointers
- Write to be **spoken**: short sentences, plain words, natural flow, smooth hand-offs to the next section
- No wrap-up at the end of each section (only the final section closes the video)

Format:

```markdown
# [Video title]
*Length: [length] · Tone: [tone] · Language: [language]*

## [Section title]
**[0:00–0:45]**

[Spoken script for this section]

## [Next section title]
**[0:45–3:00]**

...

---
### Sources
- [Source title](link): used in [section]
```

Give the total word count and the estimated spoken length. Then ask if they want changes to any section.

---

## Step 5: Video Description (if requested)

Write an SEO-friendly YouTube description from the final script:

1. **Description**: 2–4 engaging sentences with the main keywords early. Neutral wording; don't
   carry the script's tone into it
2. **Chapters**: one line per section in the form `0:00 Section title`. Only the start time and title.
   The first chapter must start at `0:00`
3. **Call to action** (optional, e.g. subscribe or a link the user gives you)
4. **Hashtags**: 3–5 relevant ones

---

## Step 6: Save

Save everything in one markdown file in the working directory named `script-[short-title].md` (the plan,
the script, sources, and the description if made). Tell the user the file name.

**Previous steps (optional):** `/youtube-brief` for the brief, `/youtube-packaging` for title and thumbnail,
`/youtube-outline` for the section structure.
