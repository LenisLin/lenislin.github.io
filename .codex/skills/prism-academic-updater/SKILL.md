---
name: prism-academic-updater
description: Update the PRISM personal academic homepage from Google Scholar, ORCID, DOI, PubMed, arXiv, OpenReview, GitHub, or user-provided paper/tool links. Use when Codex needs to refresh publications, selected papers, paper thumbnails, tool resource links, About/CV/news content, or deploy the PRISM site to GitHub Pages while preserving the current Yuxiang Lin academic homepage style.
---

# PRISM Academic Updater

## Quick Start

Use this skill inside the PRISM project at `/home/lenislin/Experiment/projects/Lecture/PRISM`.

When the user asks to update papers from Google Scholar/ORCID or add new publications:

1. Read `references/prism-project-map.md` for exact file locations and conventions.
2. Browse/verify publication metadata from primary sources whenever possible.
3. Update content in `content/` and `content_zh/`, preserving the existing card layout and selected-publication style.
4. Give every paper a thumbnail extracted from the complete first page of its PDF, following the Thumbnail Rules below.
5. Run verification before claiming completion.
6. Deploy only when the user asks to publish.

## Metadata Workflow

Treat Google Scholar as a discovery source, not the final authority. For each candidate paper, verify title, author list, year, venue, DOI/arXiv/OpenReview URL, and code/demo/docs links from primary or stable sources such as publisher pages, DOI landing pages, arXiv, OpenReview, PubMed, official GitHub repositories, or project documentation.

When updating `content/publications.bib`:

- Preserve existing custom fields unless the user asks to replace them.
- Avoid duplicates by matching DOI first, then arXiv/OpenReview URL, then normalized title.
- Keep entries sorted by year and month descending.
- Use `selected = {true}` only for representative works the user wants featured.
- Use these custom fields when available:
  - `list_preview = {paper-first-page.png}` for every paper.
  - `home_preview = {paper-first-page.png}` using the same image for selected papers.
  - `code = {https://github.com/...}`
  - `demo = {https://...}`
  - `docs = {https://...}`
  - `paper = {https://...}` for non-DOI paper pages such as arXiv/OpenReview.

## Homepage Content Rules

Maintain the current positioning:

- True name: `Yuxiang Lin`; Chinese name: `林育祥`.
- Selected publications should emphasize representative works such as TiRank, scRank, ST-Align, and HyperST unless the user updates the representative set.
- About Me should keep the structure: current PhD identity and supervisor, B.S. education, research directions, then representative work context.
- Research direction wording should keep biomedical agents focused on agentic AI in biomedical research, not image-gene foundation models.
- Tool-like publications should expose GitHub / Web GUI / Docs / Paper links whenever verified.

## Thumbnail Rules

Every paper in both **Selected Publications** and **Publications** must show the complete first page of its actual PDF.

- Verify that the PDF title and DOI or other paper identifier match the publication. Prefer the final published PDF when available; otherwise use a verified preprint PDF.
- Render page 1 as a whole page, including its margins, title, authors, publication header, and footer when present. Do not use Figure 1, an extracted figure, a publisher webpage screenshot, or a cropped page.
- Store the image as `public/papers/<paper-slug>-first-page.png`. Set `list_preview` for every paper and set `home_preview` to the identical filename for selected papers. Reuse an existing image only after verifying that it is the complete PDF first page.
- Both components must contain the whole image (`object-contain`), preserving its aspect ratio without cropping.
- If the PDF cannot be obtained, report the specific missing paper and request a local PDF path. Keep the update incomplete until its first-page image is available; do not substitute another image or silently leave a paper without a thumbnail.

For example, render a supplied PDF with Poppler:

```bash
pdftoppm -f 1 -singlefile -scale-to 1400 -png /path/to/paper.pdf public/papers/paper-first-page
```

Do not fabricate repository links; add them only when verified.

## Verification

Before reporting completion, verify that every publication's `list_preview` resolves to an existing first-page image, selected papers use the same file in `home_preview`, and the rendered images display the complete page in both sections. Then run:

```bash
npm run build
git diff --check
```

For deployed changes, also verify:

```bash
curl -I https://lenislin.github.io/
curl -fsSL https://lenislin.github.io/ -o /tmp/lenislin-gh-pages-check.html
rg -n "Yuxiang Lin|Rongshan Yu|TiRank|scRank|ST-Align|HyperST" /tmp/lenislin-gh-pages-check.html
```

## Deployment

Deploy only after the user asks to publish. The GitHub Pages remote is:

```bash
pages git@github.com:LenisLin/lenislin.github.io.git
```

Commit the content changes, then push with non-interactive SSH and progress:

```bash
GIT_SSH_COMMAND="ssh -o BatchMode=yes -o ConnectTimeout=10 -o ServerAliveInterval=10 -o ServerAliveCountMax=3" git push --progress pages main
```

If deployment stalls, inspect and terminate only the stuck `git push`/`ssh git@github.com` process, then retry with the command above.
