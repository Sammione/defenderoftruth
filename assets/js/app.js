(function () {
  const btn = document.querySelector("[data-mobile-menu-button]");
  const panel = document.querySelector("[data-mobile-menu-panel]");
  if (btn && panel) btn.addEventListener("click", () => panel.classList.toggle("hidden"));

  const current = document.body.getAttribute("data-page");
  document.querySelectorAll("[data-nav]").forEach(a => {
    if (a.getAttribute("data-nav") === current) a.classList.add("bg-gray-100","font-medium");
  });
})();
