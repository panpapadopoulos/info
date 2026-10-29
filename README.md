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
