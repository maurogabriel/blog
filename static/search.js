document.addEventListener("DOMContentLoaded", () => {
  const searchOpen = document.getElementById("search-open");
  const searchClose = document.getElementById("search-close");
  const searchModal = document.getElementById("search-modal");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const siteMain = document.getElementById("main-content");
  const focusableSelectors = [
    "button:not([disabled])",
    "a[href]",
    "input:not([disabled])",
    "textarea:not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");

  function getDocuments() {
    if (typeof searchIndex === "undefined") return [];

    if (searchIndex.documentStore?.docs) {
      return Object.values(searchIndex.documentStore.docs);
    }

    return [];
  }

  function cleanUrl(url) {
    if (!url) return "#";

    try {
      const parsed = new URL(url, window.location.origin);
      return `${parsed.pathname}${parsed.search}${parsed.hash}` || "/";
    } catch {
      return url.startsWith("/") ? url : `/${url.replace(/^\.?\//, "")}`;
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };

      return entities[char];
    });
  }

  const documents = getDocuments();
  let activeIndex = -1;

  function getResultItems() {
    return Array.from(searchResults.querySelectorAll(".search-result"));
  }

  function clearActiveResult() {
    getResultItems().forEach((item) => {
      item.classList.remove("active");
      item.removeAttribute("aria-selected");
    });
    activeIndex = -1;
  }

  function setActiveResult(index) {
    const items = getResultItems();
    if (!items.length) {
      activeIndex = -1;
      return;
    }

    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;

    items.forEach((item) => {
      item.classList.remove("active");
      item.removeAttribute("aria-selected");
    });
    items[index].classList.add("active");
    items[index].setAttribute("aria-selected", "true");
    activeIndex = index;
    items[index].scrollIntoView({ block: "nearest" });
  }

  function getFocusableModalElements() {
    if (!searchModal) return [];
    return Array.from(searchModal.querySelectorAll(focusableSelectors)).filter(
      (element) => element.offsetParent !== null
    );
  }

  function trapTabKey(event) {
    if (!searchModal || searchModal.hidden) {
      return;
    }

    const focusable = getFocusableModalElements();
    if (!focusable.length) {
      return;
    }

    const firstElement = focusable[0];
    const lastElement = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  function openSearch() {
    searchModal.removeAttribute("hidden");
    searchModal.setAttribute("aria-hidden", "false");
    siteMain?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "hidden";
    searchOpen?.setAttribute("aria-expanded", "true");
    searchInput.value = "";
    searchResults.innerHTML = "";
    clearActiveResult();
    setTimeout(() => searchInput.focus(), 50);
  }

  function closeSearch() {
    searchModal.setAttribute("hidden", "");
    searchModal.setAttribute("aria-hidden", "true");
    siteMain?.removeAttribute("aria-hidden");
    document.body.style.overflow = "";
    searchOpen?.setAttribute("aria-expanded", "false");
    searchOpen?.focus();
  }

  function renderResults(query) {
    const term = query.trim().toLowerCase();

    if (!term) {
      searchResults.innerHTML = "";
      clearActiveResult();
      return;
    }

    const results = documents
      .filter((item) => {
        const title = (item.title || "").toLowerCase();
        const body = (item.body || "").toLowerCase();

        return title.includes(term) || body.includes(term);
      })
      .slice(0, 10);

    if (!results.length) {
      searchResults.innerHTML = `<p class="search-empty">Sin resultados.</p>`;
      clearActiveResult();
      return;
    }

    searchResults.innerHTML = results
      .map((item) => {
        const url = cleanUrl(item.id);
        const title = escapeHtml(item.title || "Sin título");
        const body = item.body || "";
        const excerpt = escapeHtml(
          body.length > 140 ? body.slice(0, 140) + "..." : body
        );

        return `
          <a class="search-result" href="${escapeHtml(url)}">
            <strong>${title}</strong>
            ${excerpt ? `<span>${excerpt}</span>` : ""}
          </a>
        `;
      })
      .join("");

    setActiveResult(0);
  }

  searchOpen?.addEventListener("click", openSearch);
  searchClose?.addEventListener("click", closeSearch);

  searchInput?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveResult(activeIndex + 1);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveResult(activeIndex - 1);
    }

    if (event.key === "Enter") {
      const items = getResultItems();
      if (activeIndex >= 0 && items[activeIndex]) {
        event.preventDefault();
        window.location.href = items[activeIndex].href;
      }
    }
  });

  searchInput?.addEventListener("input", () => {
    renderResults(searchInput.value);
  });

  searchModal?.addEventListener("click", (event) => {
    if (event.target === searchModal) closeSearch();
  });

  searchModal?.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      trapTabKey(event);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSearch();

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }
  });
});
