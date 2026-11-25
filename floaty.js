// Soft flat hearts (pink, white, black):
// - float up across the whole page all the time
// - burst out wherever you touch / click
// - pop up while you scroll
(function () {
  const PATH = "M12 21.2c-.3 0-.6-.1-.8-.3C6.4 17 2 13.2 2 8.6 2 5.5 4.4 3 7.4 3c1.8 0 3.5.9 4.6 2.4C13.1 3.9 14.8 3 16.6 3 19.6 3 22 5.5 22 8.6c0 4.6-4.4 8.4-9.2 12.3-.2.2-.5.3-.8.3z";
  const COLORS = ["#f7c6d4", "#f7c6d4", "#f4a9bf", "#ffffff", "#ffffff", "#2b2326"];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const layer = document.createElement("div");
  layer.className = "floaty";
  document.body.appendChild(layer);

  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const rand = (a, b) => a + Math.random() * (b - a);

  function heart(size, color) {
    const el = document.createElement("span");
    el.className = "fh" + (color === "#ffffff" ? " white" : "");
    el.style.width = el.style.height = size + "px";
    el.innerHTML = `<svg viewBox="0 0 24 24"><path d="${PATH}" fill="${color}"/></svg>`;
    layer.appendChild(el);
    return el;
  }

  // 1) gentle floating hearts everywhere
  function floatOne() {
    if (layer.querySelectorAll(".rise").length > 8) return;
    const el = heart(rand(12, 30), pick(COLORS));
    el.classList.add("rise");
    el.style.left = rand(0, 100) + "vw";
    el.style.setProperty("--dur", rand(9, 16) + "s");
    el.style.setProperty("--sway", rand(-40, 40) + "px");
    el.style.setProperty("--spin", rand(-25, 25) + "deg");
    el.style.setProperty("--op", rand(0.55, 0.95));
    el.addEventListener("animationend", () => el.remove());
  }
  if (!reduce) {
    for (let i = 0; i < 4; i++) setTimeout(floatOne, i * 900);
    setInterval(floatOne, 1800);
  }

  // 2) burst of hearts where you touch
  function burst(x, y, n) {
    for (let i = 0; i < n; i++) {
      const el = heart(rand(14, 30), pick(COLORS));
      el.classList.add("pop");
      el.style.left = x + "px";
      el.style.top = y + "px";
      const a = rand(-Math.PI, 0) + rand(-0.4, 0.4); // mostly upward
      const d = rand(60, 170);
      el.style.setProperty("--dx", Math.cos(a) * d + "px");
      el.style.setProperty("--dy", Math.sin(a) * d - 40 + "px");
      el.style.setProperty("--spin", rand(-60, 60) + "deg");
      el.style.animationDelay = rand(0, 0.08) + "s";
      el.addEventListener("animationend", () => el.remove());
    }
  }
  window.heartBurst = burst;
  addEventListener("pointerdown", (e) => burst(e.clientX, e.clientY, reduce ? 3 : 7), { passive: true });

  // 3) hearts pop up while scrolling
  let last = 0, lastY = scrollY;
  addEventListener("scroll", () => {
    const now = performance.now();
    if (now - last < 400 || reduce) return;
    last = now;
    const down = scrollY > lastY;
    lastY = scrollY;
    const x = Math.random() < 0.5 ? rand(10, innerWidth * 0.3) : rand(innerWidth * 0.7, innerWidth - 10);
    burst(x, down ? innerHeight * rand(0.6, 0.9) : innerHeight * rand(0.2, 0.5), 1);
  }, { passive: true });
})();
