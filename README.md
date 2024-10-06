# Hugo-a-GoGo

## Features

Added in alert `<blockquote/>` by

```text
> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.
```

Pagination is in 25 posts at a time. The tags list is not paginated.

Tags can have `content/tags/<tag>/_index.md` files to get header text for the
tagged with tag list page.

Includes MathJax mathematics TeX format `\[`, `\]` or `$$`. Inline `\(`, `\)`.

## Installation

It's kept as part of a repo to have the example in context. Occasionally files
will be back copied into `themes` from the site. Then the site becomes just a
temporary override of the theme by parts.

## Configuration

## Notes on `layouts/`

### `home.html` overrides `section.html` in root `content/`

## Notes on `assers`

### Global so `resources.Get <path>` not page local `.Resources.Get <path>`
