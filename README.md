# go.bynoor.io (`NoorGO`)

Personal link directory homepage & static URL shortener for **Mohammad Noor Abu Khlaif** ([bynoor.io](https://bynoor.io)), built for GitHub Pages with zero build dependencies.

## Features

- **Instagram-Bio-First Directory (`index.html`)**: Mobile-native pocket dossier matching `bynoor.io`'s editorial palette (`#f7f3ea` paper, `#163323` pine, `#b98a1f` brass) and self-hosted fonts (`Fraunces`, `DM Sans`, `JetBrains Mono`).
- **Focused Category Filtering**: Instant segmented filter (`All`, `Work`, `Builds`, `Learn`) with sliding indicator and keyboard arrow navigation.
- **Share & QR Sheet**: One-tap native share / copy URL and an inline SVG QR code for `https://go.bynoor.io`.
- **Static Short-Link Redirector (`404.html` + `redirect.js`)**: Instant client-side redirects for short slugs (e.g. `go.bynoor.io/book`, `go.bynoor.io/kit`, `go.bynoor.io/aura`, `go.bynoor.io/resume`) with a branded 404 fallback for unknown paths.

## Adding or Updating Links

- **Homepage directory cards**: Update `index.html`.
- **Short-link redirects & quick-copy drawer**: Edit `REDIRECTS` and `FEATURED_SLUGS` in `redirect.js`.
