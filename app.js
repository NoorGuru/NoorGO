(() => {
  const ammanTimeEl = document.getElementById("amman-time");
  const yearEl = document.getElementById("year");
  const filterTabsContainer = document.querySelector(".filter-tabs");
  const filterTabs = Array.from(document.querySelectorAll(".filter-tab"));
  const filterIndicator = document.querySelector(".filter-tabs__indicator");
  const sections = Array.from(document.querySelectorAll(".dir-section"));
  const filterableItems = Array.from(document.querySelectorAll("[data-groups]"));
  const shortlinksListEl = document.getElementById("shortlinks-list");
  const shareDialog = document.getElementById("share-dialog");
  const openShareBtn = document.getElementById("open-share-btn");
  const closeShareBtn = document.getElementById("close-share-btn");
  const nativeShareBtn = document.getElementById("native-share-btn");
  const toastEl = document.getElementById("toast");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Live Amman local time
  const updateAmmanClock = () => {
    if (!ammanTimeEl) return;
    try {
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Amman",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
      ammanTimeEl.textContent = formatted;
    } catch (_) {
      ammanTimeEl.textContent = "JO";
    }
  };

  updateAmmanClock();
  setInterval(updateAmmanClock, 30000);

  // Toast feedback
  let toastTimer = null;
  const showToast = (message) => {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.hidden = true;
    }, 2200);
  };

  // Clipboard helper with fallback for restricted in-app browsers
  const copyText = async (text, toastMessage) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast(toastMessage || `Copied ${text}`);
        return true;
      }
    } catch (_) {
      // Fallback below
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (_) {
      ok = false;
    }
    document.body.removeChild(textarea);

    if (ok) {
      showToast(toastMessage || `Copied ${text}`);
    } else {
      showToast("Copy unavailable — long-press to copy");
    }
    return ok;
  };

  // Segmented filter rail + sliding indicator
  const positionIndicator = (activeTab) => {
    if (!filterIndicator || !activeTab) return;
    const index = filterTabs.indexOf(activeTab);
    if (index < 0) return;
    const width = activeTab.offsetWidth;
    const offset = activeTab.offsetLeft - 4;
    filterIndicator.style.width = `${width}px`;
    filterIndicator.style.transform = `translateX(${offset}px)`;
  };

  const applyFilter = (group) => {
    filterableItems.forEach((item) => {
      if (group === "all") {
        item.hidden = false;
        return;
      }
      const groups = (item.dataset.groups || "").split(/\s+/).filter(Boolean);
      item.hidden = !groups.includes(group);
    });

    sections.forEach((section) => {
      const items = section.querySelectorAll("[data-groups]");
      const anyVisible = Array.from(items).some((el) => !el.hidden);
      section.hidden = !anyVisible;
    });

    document.querySelectorAll(".grid-2").forEach((grid) => {
      const visibleCount = Array.from(grid.children).filter((el) => !el.hidden).length;
      grid.classList.toggle("grid-2--single", visibleCount === 1);
    });
  };

  const selectTab = (tab) => {
    if (!tab) return;
    filterTabs.forEach((btn) => {
      const active = btn === tab;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
    positionIndicator(tab);
    applyFilter(tab.dataset.filter || "all");
  };

  filterTabs.forEach((tab, idx) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        const next = filterTabs[(idx + 1) % filterTabs.length];
        next.focus();
        selectTab(next);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        const prev = filterTabs[(idx - 1 + filterTabs.length) % filterTabs.length];
        prev.focus();
        selectTab(prev);
      }
    });
  });

  if (filterTabsContainer) {
    const initial = filterTabs.find((t) => t.classList.contains("is-active")) || filterTabs[0];
    positionIndicator(initial);
    window.addEventListener("resize", () => {
      const current = filterTabs.find((t) => t.classList.contains("is-active"));
      positionIndicator(current);
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        const current = filterTabs.find((t) => t.classList.contains("is-active"));
        positionIndicator(current);
      });
    }
  }

  // Render featured short links from redirect.js
  if (shortlinksListEl && Array.isArray(window.NOOR_FEATURED_SLUGS)) {
    const fragment = document.createDocumentFragment();
    window.NOOR_FEATURED_SLUGS.forEach(({ slug, label }) => {
      const li = document.createElement("li");
      li.className = "shortlink-row";

      const info = document.createElement("div");
      info.className = "shortlink-row__info";

      const link = document.createElement("a");
      link.href = `/${slug}`;
      link.className = "shortlink-row__slug";
      link.textContent = `go.bynoor.io/${slug}`;

      const desc = document.createElement("span");
      desc.className = "shortlink-row__label";
      desc.textContent = label;

      info.appendChild(link);
      info.appendChild(desc);

      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.className = "shortlink-row__copy";
      copyBtn.textContent = "Copy";
      copyBtn.dataset.copy = `https://go.bynoor.io/${slug}`;
      copyBtn.dataset.toast = `Copied go.bynoor.io/${slug}`;
      copyBtn.setAttribute("aria-label", `Copy https://go.bynoor.io/${slug}`);

      li.appendChild(info);
      li.appendChild(copyBtn);
      fragment.appendChild(li);
    });
    shortlinksListEl.appendChild(fragment);
  }

  // Delegated copy handler for email, share sheet, and short-links
  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-copy]");
    if (!btn) return;
    const text = btn.getAttribute("data-copy");
    if (!text) return;
    copyText(text, btn.getAttribute("data-toast"));
  });

  // Share & QR bottom sheet dialog
  if (shareDialog && openShareBtn) {
    openShareBtn.addEventListener("click", () => {
      if (typeof shareDialog.showModal === "function") {
        shareDialog.showModal();
      }
    });

    if (closeShareBtn) {
      closeShareBtn.addEventListener("click", () => shareDialog.close());
    }

    shareDialog.addEventListener("click", (event) => {
      if (event.target === shareDialog) {
        shareDialog.close();
      }
    });

    if (nativeShareBtn && typeof navigator.share === "function") {
      nativeShareBtn.hidden = false;
      nativeShareBtn.addEventListener("click", async () => {
        try {
          await navigator.share({
            title: "Mohammad Noor · go.bynoor.io",
            text: "Everything important by Mohammad Noor — portfolio, live AI builds, courses & booking.",
            url: "https://go.bynoor.io/",
          });
        } catch (_) {
          // User cancelled share sheet
        }
      });
    }
  }
})();
