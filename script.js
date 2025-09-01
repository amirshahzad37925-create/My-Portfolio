// tsParticles config
tsParticles.load("particles-js", {
  background: {
    color: { value: "#000080" } // same blue background like Hunarmand Punjab
  },
  particles: {
    number: { value: 90, density: { enable: true, area: 800 } },
    color: { value: "#ffffff" },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.5,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      outModes: { default: "out" },
      attract: { enable: true, rotateX: 600, rotateY: 1200 }
    },
    size: { value: { min: 1, max: 3 } }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" }, // cursor ke pass lines kheenchengi
      onClick: { enable: true, mode: "push" }  // click karne pe naye particles aayenge
    },
    modes: {
      grab: { distance: 200, links: { opacity: 0.8 } }
    }
  }
});


