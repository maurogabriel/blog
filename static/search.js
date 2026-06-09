document.addEventListener("DOMContentLoaded", () => {
  const searchOpen = document.getElementById("search-open");
  const searchClose = document.getElementById("search-close");
  const searchModal = document.getElementById("search-modal");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

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

  function openSearch() {
    searchModal.removeAttribute("hidden");
    searchOpen?.setAttribute("aria-expanded", "true");
    searchInput.value = "";
    searchResults.innerHTML = "";
    setTimeout(() => searchInput.focus(), 50);
  }

  function closeSearch() {
    searchModal.setAttribute("hidden", "");
    searchOpen?.setAttribute("aria-expanded", "false");
    searchOpen?.focus();
  }

  function renderResults(query) {
    const term = query.trim().toLowerCase();

    if (!term) {
      searchResults.innerHTML = "";
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
  }

  searchOpen?.addEventListener("click", openSearch);
  searchClose?.addEventListener("click", closeSearch);

  searchInput?.addEventListener("input", () => {
    renderResults(searchInput.value);
  });

  searchModal?.addEventListener("click", (event) => {
    if (event.target === searchModal) closeSearch();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSearch();

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }
  });
});
