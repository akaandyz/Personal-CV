# Deploying to GitHub Pages

## One-time setup

1. Push this repo to GitHub (if not already done).
2. Go to **Settings → Pages** in your GitHub repo.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Save.

## Deploying

Every push to `main` triggers the workflow in `.github/workflows/deploy.yml`,
which builds the Next.js static export and deploys it automatically.

You can also trigger a deploy manually from the **Actions** tab →
**Deploy to GitHub Pages** → **Run workflow**.

## Live URL

https://akaandyz.github.io/Personal-CV
