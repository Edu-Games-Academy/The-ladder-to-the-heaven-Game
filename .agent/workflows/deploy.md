---
description: Build and deploy the application to GitHub Pages
---

To deploy your application to GitHub Pages, follow these steps:

1. Ensure all your changes are committed and pushed to your main branch.
2. Run the deployment script:
// turbo
```bash
npm run deploy
```

This command will:
- Run `npm run build` to generate the production-ready `dist/` folder.
- Use the `gh-pages` utility to create (or update) a `gh-pages` branch in your repository.
- Push the contents of the `dist/` folder to that branch.

After the command finishes:
1. Go to your GitHub repository settings.
2. Navigate to **Pages** (under Code and automation).
3. Ensure the **Source** is set to "Deploy from a branch" and the **Branch** is set to `gh-pages` / `/(root)`.
4. Your site will be live at `https://Edu-Games-Academy.github.io/The-ladder-to-the-heaven-Game/`.
