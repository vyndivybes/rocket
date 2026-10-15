# Saathi Browser Helper — optional Chrome or Edge extension

This extension is optional, free, and has no server account, remote background runtime, payment or login access.

1. Download/clone the Saathi repository to the Windows computer.
2. Open chrome://extensions (or edge://extensions) and enable Developer mode.
3. Click Load unpacked and select local-companion/extension.
4. Open a public HTTPS educational webpage.
5. Click Saathi Browser Helper in the browser toolbar, then choose an action:
   - Read current page: display and optionally copy a bounded visible text excerpt.
   - Highlight on page: mark matching terms in the current tab.
   - Open matching link: inspect visible links and ask before opening one.
6. Paste a copied excerpt into Saathi to study and explain it.

The extension only asks for activeTab and scripting permissions. It doesn't ask for browser history, all websites, microphone, device files, account cookies, clipboard read, or persistent background execution. It doesn't automatically send the page to Saathi or any cloud endpoint. Closing the popup ends the interaction; page highlights remain until page reload.

It does NOT: click private-account forms, buy anything, install software, use unrestricted browser scripts, or run arbitrary commands. Do not describe it as full autonomous computer use.

Use the separate local-companion/saathi-local.mjs helper for explicit Windows browser-opening, study-note saving and device status.
