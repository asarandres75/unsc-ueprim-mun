# UNSC Delegate Hub, UEPRIM-MUN IV Edition 2026–2027

The website of the United Nations Security Council committee at UEPRIM-MUN. Delegates sign in to read the handbook, download documents, review procedure, follow PRE-MUN and keep their own notes. The Presidency signs in with a separate code that unlocks sanctions, internal notes, evaluations, notices and the dais-only files.

## How to sign in

**Delegates** choose their delegation, type the delegate code and pick a personal PIN of at least four characters. The first PIN typed for a delegation becomes its PIN, which is what keeps each delegation's notes private. If someone forgets it, the Presidency can reset it from Presidency Desk, then Delegations.

**Presidency** chooses President, Vice-President or Secretary and types the Presidency code.

| Role | Default code |
| --- | --- |
| Delegates | `DelegadosUNSC2026` |
| UNSC Presidency | `PresidenciaUNSC2026` |

To change a code, go to Vercel, open the project, then Settings, then Environment Variables, add `DELEGATE_CODE` or `PRESIDENCY_CODE` with the new value and redeploy. The codes are checked on the server, so they never appear in the page source.

## Turning on the online database (needed for notes and sanctions to sync)

Without a database the site still works, but notes, sanctions and notices are saved only in the browser that wrote them. To make them shared and available on any device:

1. In Vercel, open the project and go to **Storage**.
2. Choose **Create Database**, pick **Upstash for Redis** (free plan), and connect it to this project.
3. Redeploy. Vercel adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` by itself and the site starts using them.

## How to change the content

Almost every word on the site lives in `public/js/content.js`. Open it on GitHub, click the pencil icon, change the text between the quotes and commit. Vercel redeploys within about a minute.

- **Dais emails and descriptions** are in `dais`.
- **Handbook text, topics, links and QARMAs** are in `handbook`.
- **Document Centre** cards are in `documents`. To add a file, upload it to `public/docs/` and add a line like `['Title', 'Short description.', 'docs/your-file.pdf']`.
- **PRE-MUN sessions** are in `sessions.days`.
- **Mock Simulation II** briefing is in `mock`.
- **Upcoming event** default text is in `upcoming`, but the Presidency can change it from Presidency Desk, then Notices and event, without touching code.
- **Presidency-only files** go in the `private/` folder and are listed in `privateFiles`. They are served only after the Presidency code is entered, so keep this repository private.
- **Delegations** are in `public/js/roster.json`.

## Running it on your computer

```
node scripts/dev-server.js          # site only, notes saved in the browser
MOCK_KV=1 node scripts/dev-server.js  # with a fake in-memory database
```

Then open http://localhost:3000.

## Structure

```
public/            the website (HTML, CSS, JS, images, public documents)
public/js/content.js   all the text on the site
api/               serverless functions: login, data, private files, status
private/           Presidency-only files, never served without the code
vercel.json        tells Vercel to serve /public and bundle /private with the API
```
