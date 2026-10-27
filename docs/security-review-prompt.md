# Security Review Prompt

A reusable prompt for a security review and hardening pass on this project.
To use it, paste everything inside the code block below as your whole message
to Claude Code.

```text
Do a security review and hardening pass on this project. I'm not an experienced
coder, so explain findings in plain language.

1. UNDERSTAND THE PROJECT FIRST
   - List all files and read every source file before changing anything.
   - Work out what kind of app it is (frontend only? has a server? a database?
     logins?). For each item below, say whether it applies. If it doesn't
     apply, say so honestly. Do not add fake or client-side-only "security".

2. CHECK IT INSTALLS AND BUILDS
   - Run the install and build commands. Fix anything that stops them working.

3. DEPENDENCIES
   - For every package, check whether the code actually uses it. Remove unused ones.
   - Update packages to their latest version within the same major version first.
   - Run `npm audit`. Only move a package up a major version if that's needed
     to fix a security advisory, and first check that the code's usage still
     works with the new version.
   - Commit the lockfile so installs are reproducible.

4. SECRETS AND EXPOSED FILES
   - Search the code for API keys, tokens, passwords and environment variables.
   - Search the whole git history for sensitive filenames (.env, .pem, .key,
     .db) and secret-looking strings (sk-, AKIA, ghp_, AIza, key=/token=).
   - Check that .gitignore covers .env files and build output.

5. XSS AND INPUT HANDLING
   - Look for innerHTML, dangerouslySetInnerHTML, eval.
   - Find every place user input becomes a link (href, window.open) and allow
     only http:// and https:// links (block javascript:, data:, and similar).
   - Trim inputs, add length limits, and show clear error messages.
   - Make external links use noopener/noreferrer.

6. DEBUG MODE
   - Look for console.log and debugger statements, and make sure production
     builds don't ship source maps.

7. SECURITY HEADERS
   - Add a Content-Security-Policy, X-Content-Type-Options, X-Frame-Options,
     Referrer-Policy and Permissions-Policy.
   - Make sure the policy doesn't break the dev server or the app's images and styles.

8. AUTH, ACCESS, API, DATABASE, CORS, RATE LIMITING
   - If the project has a backend: review and fix each one.
   - If it doesn't: explain what's missing and recommend a realistic next step.

9. VERIFY - DON'T ASSUME
   - Type-check and build with no errors or warnings.
   - Run the app in a real browser and check every page loads.
   - Confirm the headers are actually sent.
   - Try an attack (for example, submit a javascript: link) and confirm it's blocked.

10. FINISH
   - Clean up generated files, commit with a clear message, and push.
   - Give a summary table: request → what you found → what you did.
   - List separately anything you couldn't do, and why.
```
