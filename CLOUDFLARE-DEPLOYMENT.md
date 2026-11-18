# Cloudflare deployment

The production site is https://knoxville-wedding-venues.seanllms.workers.dev in Sean’s personal account `7a7a08127b6d6744c838413b4473ecf1`.

Open a pull request against `gh-pages`. The Cloudflare workflow builds or stages the public assets and validates the Worker bundle without deploy credentials. After checks pass and the pull request is merged, pushes to `gh-pages` deploy through the repository secret `CLOUDFLARE_API_TOKEN`.

Application secrets stay in Worker bindings. The Vercel project is preserved as historical deployment data.
