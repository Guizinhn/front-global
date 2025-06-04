const title = document.querySelector(".fade-title");

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      title.classList.add("visible");
    } else {
      title.classList.remove("visible");
    }
  },
  { threshold: 0.9 }
);

observer.observe(title);
