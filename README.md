# Panagiotis Papadopoulos - Personal Website

My personal portfolio website showcasing my education, experience, publications, projects, and skills.

🌐 **Live Site:** [panagiotispapadopoulos.com](https://panagiotispapadopoulos.com)

## Sections
- About Me
- Education
- Experience
- Publications
- Projects
- Skills
- Contact

## Built with
[Next.js](https://nextjs.org) (App Router, static export), [Tailwind CSS](https://tailwindcss.com) and [Framer Motion](https://motion.dev). All copy and links live in [`lib/site.ts`](lib/site.ts).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
```

## CV and content manager
The CV page at `/cv` is built from [`content/cv.json`](content/cv.json) and prints as a black-and-white résumé (**Print / Save PDF**).

Edit it visually at `/admin` ([Decap CMS](https://decapcms.org), configured in [`public/admin/`](public/admin/)). There is no auth server: you sign in with a GitHub token.

1. Create a [fine-grained personal access token](https://github.com/settings/personal-access-tokens/new) with **Repository access → Only select repositories → info**, **Permissions → Contents: Read and write**, and an expiry date.
2. Open `/admin`, paste the token and sign in. It is stored in that browser only; **Log out** in the CMS removes it.
3. Each save commits `content/cv.json` to `main`, and the site redeploys in a minute or two.

Links inside experience bullets use `[label](https://…)`.

Pushing to `main` builds and deploys the site to GitHub Pages ([`.github/workflows/static.yml`](.github/workflows/static.yml)). In the repository settings, **Pages → Source** must be set to **GitHub Actions**.

## Legacy site
The previous version of the site is kept unchanged in [`legacy/`](legacy/) and published at `/legacy/`, including the LCARS interface at `/legacy/lcars/`.

## Credits

Original design based on Studiova by [ThemeWagon](https://themewagon.com)

### License
- Design and Code is Copyright © [WrapPixel](https://www.wrappixel.com/)
- Licensed under [MIT]
- Distributed by [ThemeWagon](https://themewagon.com)
- Clone Repository: `git clone https://github.com/themewagon/Studiova.git`
