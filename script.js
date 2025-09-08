document.addEventListener("DOMContentLoaded", () => {
  const strips = [
    { selector: ".strip-a", phase: 0 },
    { selector: ".strip-n", phase: Math.PI / 2 },
  ];
  const launchHeading = document.querySelector(".launch-heading");
  const rect = launchHeading.getBoundingClientRect();
  const startTop = rect.bottom + window.scrollY;

  strips.forEach(({ selector, phase }) => {
    const container = document.querySelector(selector);
    const height = window.innerHeight - startTop;
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "80");
    svg.setAttribute("height", height);
    svg.style.position = "absolute";
    svg.style.top = `${startTop}px`;
    svg.style.left = "0";

    // path for half-circle
    const path = document.createElementNS(svgNS, "path");
    const radius = 40; // half of svg width
    path.setAttribute("d", `M0,0 Q${radius},${height / 2} 0,${height}`);
    path.setAttribute("stroke", "rgba(17,17,132,0.25)");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");

    // glow filter
    const defs = document.createElementNS(svgNS, "defs");
    const filter = document.createElementNS(svgNS, "filter");
    filter.setAttribute("id", `glow-${selector}`);
    const blur = document.createElementNS(svgNS, "feGaussianBlur");
    blur.setAttribute("stdDeviation", "3");
    filter.appendChild(blur);
    defs.appendChild(filter);
    svg.appendChild(defs);
    path.setAttribute("filter", `url(#glow-${selector})`);

    svg.appendChild(path);
    container.appendChild(svg);

    // animate sway and blur
    let time = 0;
    function move() {
      time += 0.01;
      const sway = Math.sin(time + phase) * 10;
      const blurAmount = Math.abs(Math.sin(time + phase)) * 5 + 4;
      svg.style.transform = `translateX(${sway}px)`;
      path.setAttribute("stroke", `rgba(17,17,132,0.25)`);
      svg.style.filter = `blur(${blurAmount}px)`;
      requestAnimationFrame(move);
    }
    move();
  });
});
