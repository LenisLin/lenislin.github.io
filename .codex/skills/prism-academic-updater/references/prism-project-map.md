# PRISM Project Map

## Root

Project root:

`/home/lenislin/Experiment/projects/Lecture/PRISM`

The site is a static-export Next.js academic homepage. Build output goes to `out/`, which is ignored by git. Do not commit `.next/` or `out/`.

## Core Content Files

- English site config: `content/config.toml`
- Chinese site config: `content_zh/config.toml`
- English About Me: `content/bio.md`
- Chinese About Me: `content_zh/bio.md`
- Publications: `content/publications.bib`
- Publications page config: `content/publications.toml`
- Chinese publications page config: `content_zh/publications.toml`
- English CV: `content/cv.md`
- Chinese CV: `content_zh/cv.md`
- English news: `content/news.toml`
- Chinese news: `content_zh/news.toml`

There is one shared publications BibTeX file. Do not create `content_zh/publications.bib` unless the app is changed to load it.

## Publication Fields

`src/lib/bibtexParser.ts` parses these custom fields:

- `selected`: `true` or `yes` to show in selected publications.
- `preview`: generic preview image.
- `list_preview` or `figure_preview`: full publications page thumbnail.
- `home_preview` or `venue_preview`: homepage selected-publication thumbnail.
- `description` or `note`: short card description.
- `keywords`: comma-separated tags.
- `code`: GitHub/code URL.
- `demo` or `web_demo`: Web GUI/demo URL.
- `docs` or `documentation`: documentation URL.
- `paper` or `paper_url`: paper landing page when DOI URL is not ideal.
- `website` or `project_url`: project website.

`src/types/publication.ts` must stay aligned with parsed fields.

## Components That Render Publications

- Selected homepage cards: `src/components/home/SelectedPublications.tsx`
- Full publications list: `src/components/publications/PublicationsList.tsx`
- Resource buttons: `src/components/publications/PublicationLinks.tsx`
- Button labels: `src/lib/i18n/messages.ts`

When adding new button types, update all four places consistently.

## Images

Avatar:

- Public path in config: `/bio.jpg`
- File: `public/bio.jpg`
- Crop style: `src/components/home/Profile.tsx`, currently `object-[right_top]`.

Paper thumbnails:

- Directory: `public/papers/`
- Current naming pattern: `tirank-figure1.png`, `tirank-home.png`, `scrank-figure1.png`, etc.
- Use `list_preview` for full publication page thumbnails and `home_preview` for homepage selected-paper cards.

## Current Representative Works

Keep these as selected unless the user says otherwise:

- ST-Align
- TiRank
- HyperST
- scRank / colorectal cancer recurrence-risk single-cell paper

Known verified links:

- ST-Align paper: `https://openreview.net/forum?id=EWzPy228cM`
- ST-Align code: `https://github.com/dumbgoos/ST-Align`
- TiRank code: `https://github.com/LenisLin/TiRank`
- TiRank Web GUI tutorial: `https://tirank.readthedocs.io/en/latest/tutorial_web.html`
- TiRank docs: `https://tirank.readthedocs.io/`
- HyperST paper: `https://arxiv.org/abs/2511.22107`
- scRank code/docs: `https://github.com/xmuyulab/scRank-XMBD`

If a public HyperST code repository is found later, verify it before adding it.

## Deployment

The original `origin` remote points to the upstream template. Do not push personal homepage changes there.

Use the `pages` remote:

```bash
git remote -v
git push pages main
```

If HTTPS auth fails or SSH stalls, use:

```bash
GIT_SSH_COMMAND="ssh -o BatchMode=yes -o ConnectTimeout=10 -o ServerAliveInterval=10 -o ServerAliveCountMax=3" git push --progress pages main
```

Verify GitHub Pages at:

`https://lenislin.github.io/`
