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

Included search by `pagefind` so `cargo install pagefind` and run it after
`hugo` to build the indexes with `pagefind --site public`.

Includes an external new tab hyperlink handler.

The code syntax plugin is installed to use a `syntax.css` stylesheet and not the
inline style which was default.

Style classes and ids can be added to markdown by `{.class #id}` after
the thing to be styled. Sometimes inline, sometimes on the line after
depending on the DOM element made.

## Installation

It's kept as part of a repo to have the example in context. Occasionally files
will be back copied into `themes` from the site. Then the site becomes just a
temporary override of the theme by parts. If that makes sense.

If it doesn't then simply place the theme in `themes/hugo-a-gogo/` and copy
the `hugo.toml` from the theme to the site root directory. You'll then
have to uncomment the `#theme = ['hugo-a-gogo']` line in `hugo.toml` to
access the theme. You can delete pages from the theme as you find you don't
need them. I placed a `build.sh` script in the theme which if copied too
and the build tools are installed will automate site building if your site
is a github repository.

## Configuration

None so far.

> [!IMPORTANT] a few gotchas of Hugo
> In `layouts/`, `home.html` overrides `section.html` in the root `content/`.
> In `assets/` resources are global so `resources.Get <path>`, not the page local `.Resources.Get <path>`.
