const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 }); // 20% visible hone par animation start hogi

document.querySelectorAll('.animate').forEach(el => observer.observe(el));

// Counter animation
const counters = document.querySelectorAll(".counter");
const speed = 200; // Speed adjust karne ke liye

counters.forEach(counter => {
  const animate = () => {
    const value = +counter.getAttribute("data-target");
    const data = +counter.innerText;

    const increment = value / speed;

    if (data < value) {
      counter.innerText = Math.ceil(data + increment);
      setTimeout(animate, 20);
    } else {
      counter.innerText = value;
    }
  };

  // Trigger only when section is visible
  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate();
        observer.unobserve(counter); // run once only
      }
    });
  }, { threshold: 0.6 });

  observer.observe(counter);
});
