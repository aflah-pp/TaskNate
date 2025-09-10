document.addEventListener("DOMContentLoaded", () => {
  const strips = [
    { selector: ".strip-a", phase: 0 },
    { selector: ".strip-n", phase: Math.PI / 2 },
  ];

  const launchHeading = document.querySelector(".launch-heading");
  if (!launchHeading) return;

  const rect = launchHeading.getBoundingClientRect();
  const startTop = rect.bottom + window.scrollY;
  const height = window.innerHeight - startTop;

  strips.forEach(({ selector, phase }) => {
    const container = document.querySelector(selector);
    if (!container) return;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "80");
    svg.setAttribute("height", height);
    svg.style.position = "absolute";
    svg.style.top = `${startTop}px`;
    svg.style.left = "0";

    const path = document.createElementNS(svgNS, "path");
    const radius = 40;
    path.setAttribute("d", `M0,0 Q${radius},${height / 2} 0,${height}`);
    path.setAttribute("stroke", "rgba(17,17,132,0.25)");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");

    const defs = document.createElementNS(svgNS, "defs");
    const filter = document.createElementNS(svgNS, "filter");
    filter.setAttribute("id", `glow-${selector.substring(1)}`);
    const blur = document.createElementNS(svgNS, "feGaussianBlur");
    blur.setAttribute("stdDeviation", "3");
    filter.appendChild(blur);
    defs.appendChild(filter);
    svg.appendChild(defs);
    path.setAttribute("filter", `url(#glow-${selector.substring(1)})`);

    svg.appendChild(path);
    container.appendChild(svg);

    let time = 0;
    const move = () => {
      time += 0.01;
      const sway = Math.sin(time + phase) * 10;
      const blurAmount = Math.abs(Math.sin(time + phase)) * 5 + 4;

      svg.style.transform = `translateX(${sway}px)`;
      svg.style.filter = `blur(${blurAmount}px)`;

      requestAnimationFrame(move);
    };
    move();
  });
});
