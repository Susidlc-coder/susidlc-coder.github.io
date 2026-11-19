(() => {
  "use strict";

  const dialog = document.getElementById("sunday-reader");
  const archive = document.querySelector(".advent-print-readings");
  if (!dialog || !archive || typeof dialog.showModal !== "function") return;
  const surface = dialog.querySelector(".reader-surface");
  const arrows = Array.from(dialog.querySelectorAll("[data-step]"));

  const triggers = new Map();
  for (const link of document.querySelectorAll("[data-open-reading]")) {
    link.setAttribute("aria-haspopup", "dialog");
    triggers.set(link.hash, link);
  }
  let currentTrigger;

  function syncReader() {
    const trigger = triggers.get(location.hash);
    if (!trigger) {
      if (dialog.open) {
        dialog.close();
        currentTrigger?.focus({ preventScroll: true });
        currentTrigger = null;
      }
      return;
    }

    const source = document.getElementById(trigger.hash.slice(1));
    if (!source || !archive.contains(source)) return;
    const article = source.cloneNode(true);
    article.removeAttribute("id");
    const heading = article.querySelector("h2");
    heading.id = "active-reading-title";
    article.setAttribute("aria-labelledby", heading.id);
    dialog.setAttribute("aria-labelledby", heading.id);
    dialog.dataset.week = source.dataset.week || "providence";
    surface.replaceChildren(article);
    for (const arrow of arrows) {
      const adjacent = Number(source.dataset.week) + Number(arrow.dataset.step);
      arrow.disabled = !triggers.has("#domingo-" + adjacent);
    }
    if (!dialog.open) {
      currentTrigger = trigger;
      dialog.showModal();
    }
    surface.scrollTop = 0;
    heading.focus({ preventScroll: true });
  }

  function changeSunday(step) {
    const nextHash = "#domingo-" + (Number(dialog.dataset.week) + step);
    if (!triggers.has(nextHash)) return;
    history.replaceState(history.state, "", nextHash);
    syncReader();
    window.SusiLocale?.refresh();
  }

  for (const arrow of arrows) {
    arrow.addEventListener("click", () => changeSunday(Number(arrow.dataset.step)));
  }

  function dismissReader() {
    if (history.state?.adventReading) {
      history.back();
      return;
    }
    const link = currentTrigger;
    const address = new URL(location.href);
    address.hash = "";
    history.replaceState(history.state, "", address);
    syncReader();
    link?.scrollIntoView({ block: "center", behavior: "instant" });
    window.SusiLocale?.refresh();
  }

  document.addEventListener("click", event => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.("[data-open-reading]");
    if (link) {
      event.preventDefault();
      history.pushState({ adventReading: true }, "", link.hash);
      syncReader();
      window.SusiLocale?.refresh();
    } else if (dialog.open && event.target.closest?.("[data-close-reading]")) {
      dismissReader();
    }
  });

  dialog.addEventListener("cancel", event => {
    event.preventDefault();
    dismissReader();
  });
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    dismissReader();
  });
  window.addEventListener("hashchange", syncReader);

  function initialize() {
    const chooser = document.querySelector("[data-language-dialog][open]");
    if (chooser) chooser.addEventListener("close", syncReader, { once: true });
    else syncReader();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();

  document.querySelector("[data-print-reflections]")?.addEventListener("click", () => window.print());
  let openedForPrint = [];
  window.addEventListener("beforeprint", () => {
    for (const passage of archive.querySelectorAll(".gospel-passage:not([open])")) {
      openedForPrint.push(passage);
      passage.open = true;
    }
  });
  window.addEventListener("afterprint", () => {
    for (const passage of openedForPrint) passage.open = false;
    openedForPrint = [];
  });
})();
