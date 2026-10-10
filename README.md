# Twinshade – website

Landing page, support page, privacy policy and terms of use for the mobile game
**Twinshade: Two Worlds Runner** by Medin Turkes. Plain static HTML/CSS/JS, hosted on GitHub Pages.

- Live: https://metur100.github.io/Shadow.Runner.Landing/
- Privacy policy (for Google Play / App Store Connect): https://metur100.github.io/Shadow.Runner.Landing/privacy.html
- Support URL: https://metur100.github.io/Shadow.Runner.Landing/#support
- App ID / bundle ID: `com.certidevelopment.shadowrunner`

## When the app is live

In `index.html`:

1. In the hero, change the two store buttons' `href="#download"` to the real store URLs
   (a comment above them lists the Google Play URL).
2. In the `#download` section, turn the two `<div class="store" role="img">` badges into `<a class="store" href="…">` links
   and change "Coming soon to" to "Get it on" / "Download on the".
3. Update the "Coming soon" wording in the eyebrow, the FAQ and the JSON-LD FAQ answer.

## Assets

Screenshots and icons come from `store/` in the app repo (screenshots resized to 540×960 WebP,
`og-image.jpg` is the feature graphic cropped to 1200×630, `favicon.ico` wraps 16/32/48 px PNGs).
The Fredoka font is self-hosted under the SIL Open Font License (see `assets/fonts/OFL-Fredoka.txt`),
so the site makes no third-party requests. No cookies, no analytics.

## SEO

- Metadata, Open Graph/Twitter cards and JSON-LD (`WebSite`, `Person`, `MobileApplication`/`VideoGame`, `FAQPage`,
  breadcrumbs on the legal pages) live in the `<head>` of each page. Validate with https://search.google.com/test/rich-results
- `sitemap.xml` lists all pages plus the screenshots. Update `<lastmod>` when content changes.
- `robots.txt` only takes effect at a domain root, so on `metur100.github.io/Shadow.Runner.Landing/` it is ignored;
  submit the sitemap in Google Search Console instead.

### Google Search Console (one-time)

1. https://search.google.com/search-console → *Add property* → **URL prefix** → `https://metur100.github.io/Shadow.Runner.Landing/`
2. Verify with *HTML tag*: paste the `<meta name="google-site-verification" ...>` tag into the `<head>` of `index.html` and push.
3. *Sitemaps* → submit `sitemap.xml`.
4. *URL inspection* → enter the homepage URL → *Request indexing*.
