(function selectArtboardVariant() {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const state = params.get("state") || document.body.dataset.defaultState || "default";
  const completed = params.get("completed");
  const mode = params.get("mode");
  const error = params.get("error");

  document.documentElement.dataset.state = state;
  if (completed) document.documentElement.dataset.completed = completed;
  if (mode) document.documentElement.dataset.mode = mode;
  if (error) document.documentElement.dataset.error = error;

  const variants = Array.from(document.querySelectorAll("[data-variant]"));
  const candidates = variants.filter((variant) => variant.dataset.variant === state);
  const selected =
    candidates.find((variant) => !variant.dataset.completed || variant.dataset.completed === completed) ||
    candidates[0] ||
    variants[0];

  variants.forEach((variant) => {
    variant.hidden = variant !== selected;
  });

  if (selected && selected.dataset.survivors) {
    const survivorCount = Number(selected.dataset.survivors);
    const survivorStatus = document.querySelector("[data-survivor-status]");
    const fragmentStatus = document.querySelector("[data-fragment-status]");
    if (survivorStatus) survivorStatus.textContent = `${survivorCount} ${survivorCount === 1 ? "herói sobrevivente" : "heróis sobreviventes"}`;
    if (fragmentStatus) fragmentStatus.textContent = `${selected.dataset.fragments} de 2 partes do mapa`;
  }

  if (error === "destination-required" && selected) {
    selected.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.checked = false;
    });
    selected.querySelectorAll("[data-route-summary]").forEach((element) => {
      element.textContent = "Nenhum caminho escolhido";
    });
    selected.querySelectorAll("[data-route-selected-status]").forEach((element) => {
      element.textContent = "Disponível";
    });
    selected.querySelectorAll("[data-departure]").forEach((element) => {
      element.textContent = "Partir";
    });
  }

  document.querySelectorAll("[data-if-error]").forEach((element) => {
    element.hidden = element.dataset.ifError !== error;
  });

  document.querySelectorAll("[data-if-mode]").forEach((element) => {
    element.hidden = element.dataset.ifMode !== mode;
  });
})();
