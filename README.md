# KhAyAL — Kannur Ayurveda College Alumni Association

Website for the alumni association of **Government Ayurveda Medical College,
Pariyaram**. Registration number **KNR/CA/355/2024**.

A static React site: no server, no database. Everything it displays comes from
typed content modules, so keeping the site current is editing data files.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # typecheck + production build into dist/
npm run preview    # serve that build locally
npm run typecheck
npm run lint
npm run format
```

Node 22 or newer.

## Editing the site's content

All of it is in `src/content/`:

| File            | What it holds                                                        |
| --------------- | -------------------------------------------------------------------- |
| `site.ts`       | Name, registration number, contact details, social links, navigation |
| `about.ts`      | History, mission, vision, objectives, timeline, figures              |
| `committee.ts`  | Office bearers and executive committee                               |
| `events.ts`     | Every event — upcoming and past are worked out from the dates        |
| `gallery.ts`    | Photo albums and their alt text                                      |
| `notices.ts`    | Noticeboard announcements                                            |
| `membership.ts` | Eligibility, benefits, fees, how to join, bank details               |

`types.ts` describes the shape of each. If a required field is missing or
misspelled, `npm run build` fails with the file and line — nothing reaches the
site half-filled.

### Adding an event

Add an entry to the array in `src/content/events.ts`:

```ts
{
  slug: 'alumni-meet-2027',        // becomes /events/alumni-meet-2027
  title: 'Alumni Meet 2027',
  date: '2027-09-04',              // ISO. Past/upcoming is derived from this
  time: '4:00 PM onwards',
  venue: 'College Campus, Pariyaram',
  summary: 'One or two sentences shown on the card.',
  body: ['Longer paragraphs shown on the event page.'],
  registerUrl: 'https://…',        // optional; the button hides without it
  tags: ['Meet'],
}
```

Nothing else needs changing — the home page, the events page and the event's own
page all read from that one array.

### Adding photographs

1. Put the image files in `public/gallery/`.
2. Add them to an album in `src/content/gallery.ts`, with real `alt` text
   describing what is in each picture.

Alt text is written in the content file, not the component, because it is
content — it is the caption for a reader who cannot see the image.

### Adding a committee member

Add to `officeBearers` or `executiveMembers` in `src/content/committee.ts`. A
photo is optional: put the file in `public/committee/` and set
`photo: '/committee/name.jpg'`. Without one the card shows the member's initials.

## Before publishing

Placeholder values are marked `TODO:` in the content files. Find them all with:

```bash
grep -rn "TODO" src/content
```

What needs real values:

- [ ] `site.ts` — email, phone, postal address, map link, social media handles
- [ ] `site.ts` — how the association explains the name _KhAyAL_
- [ ] `about.ts` — history, mission and vision wording, timeline, the four figures
- [ ] `committee.ts` — every name, role, batch and photograph
- [ ] `events.ts` — the actual programme; delete the sample entries
- [ ] `notices.ts` — real announcements
- [ ] `gallery.ts` — real photographs and their alt text (replace the placeholder
      graphics in `public/gallery/`)
- [ ] `membership.ts` — fees approved by the general body, bank account details,
      and `formUrl` for the membership form

## Deploying

Pushing to `main` builds and publishes to GitHub Pages via
`.github/workflows/deploy.yml`. One-time setup: **Settings → Pages → Source →
GitHub Actions**.

The site is built for the `/alumni-kac-web/` sub-path. For a custom domain,
change `VITE_BASE` in the workflow to `/` and add a `CNAME` file to `public/`.

## How it is built

See `CLAUDE.md` for the component structure (atoms / molecules / organisms) and
the interaction design rules the site follows.
