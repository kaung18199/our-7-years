# 💗 For You

A small love website.

- `index.html`: asks for the day she gave the answer (answer: **26-11-2019**)
- `love.html`: love & thank-you page in Myanmar, with a day counter, 3D photo ring, photo gallery and letter
- `images/`: our photos (1.jpg – 9.jpg)

## Deploy on GitHub Pages

1. Create a new repository on GitHub, e.g. `for-you`.
2. Upload everything in this folder (`index.html`, `love.html`, `style.css`, `floaty.js`, `images/`).
   Or with git:
   ```bash
   git init
   git add .
   git commit -m "For you ❤️"
   git branch -M main
   git remote add origin https://github.com/<your-username>/for-you.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**, under **Source** choose **Deploy from a branch**, pick `main` / `(root)`, and save.
4. After a minute your link is ready: `https://<your-username>.github.io/for-you/`

## Edit

- Captions and the letter are in `love.html`. Search for `figcaption` and `class="letter"`.
- The date check is in `index.html` (`"26112019"`).

Note: the date check is only a cute gate. Anyone who opens `love.html` after the check, or reads the code, can see the page. A public GitHub repo also makes the photos public.

## Music

Put your song in this folder and name it exactly `music.mp3` (next to `love.html`), then upload it to GitHub too.

- Phones don't allow sound until the visitor taps, so the song starts on her first tap on the love page.
- The round ♫ button at the bottom right pauses and plays it.
- If there is no `music.mp3`, the button just stays hidden.
