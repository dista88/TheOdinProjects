const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const html = document.documentElement;

const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
  html.classList.add("dark");
  themeIcon.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");

  if (html.classList.contains("dark")) {
    themeIcon.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});
