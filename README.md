# UNSC Delegate Hub, UEPRIM-MUN IV Edition 2026–2027

The website of the United Nations Security Council committee at UEPRIM-MUN. Delegates sign in to see events, post on the public notes board, download documents, review the Rules of Procedure, follow PRE-MUN and keep their own notes. The Presidency signs in with a code that unlocks sanctions, internal notes, evaluations, the events editor and the Presidency-only files.

## How to sign in

**Delegates** choose their delegation and type a personal PIN of at least four characters. The first PIN typed for a delegation becomes its PIN, which is what keeps each delegation's notes private. If someone forgets it, the Presidency can reset it from Presidency Only, then Delegations.

**Presidency** chooses President, Vice-President or Secretary and types the Presidency code.

The default Presidency code is `PresidenciaUNSC2026`. To change it, go to Vercel, open the project, then Settings, then Environment Variables, add `PRESIDENCY_CODE` with the new value and redeploy. The code is checked on the server, so it never appears in the page source.

## Turning on the online database (needed for notes and sanctions to sync)

Without a database the site still works, but notes, sanctions and notices are saved only in the browser that wrote them. To make them shared and available on any device:

1. In Vercel, open the project and go to **Storage**.
2. Choose **Create Database**, pick **Upstash for Redis** (free plan), and connect it to this project.
3. Redeploy. Vercel adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` by itself and the site starts using them.

## Turning on file uploads for the public notes board

Attaching a PDF or Word file to a public note needs a Vercel Blob store. In Vercel, open the project, go to **Storage**, choose **Create Database**, pick **Blob** and connect it to this project, then redeploy. Vercel adds `BLOB_READ_WRITE_TOKEN` by itself. Files can be up to 4 MB.

## How to change the content

Almost every word on the site lives in `public/js/content.js`. Open it on GitHub, click the pencil icon, change the text between the quotes and commit. Vercel redeploys within about a minute.

- **Contacts** (role, name and email) are in `contacts`.
- **Events** default list is in `events`, but the Presidency can add, remove and reorder events and post an announcement from Presidency Only, then Events and announcement, without touching code.
- **Documents** are in `documents`, split into groups. To add a file, upload it to `public/docs/` and add a line like `['Title', 'docs/your-file.pdf']`. Its cover thumbnail goes in `public/thumbs/` with the same name ending in `.jpg`.
- **PRE-MUN sessions** are in `sessions.days`.
- **Rules of Procedure** are in `procedure`.
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
api/               serverless functions: login, data, public board, private files, status
private/           Presidency-only files, never served without the code
vercel.json        tells Vercel to serve /public and bundle /private with the API
```
