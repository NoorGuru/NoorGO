(() => {
  const REDIRECTS = {
    // Core portfolio & conversion
    site: "https://bynoor.io/",
    web: "https://bynoor.io/",
    home: "https://bynoor.io/",
    portfolio: "https://bynoor.io/",
    book: "https://cal.com/mohammad-noor",
    cal: "https://cal.com/mohammad-noor",
    call: "https://cal.com/mohammad-noor",
    meet: "https://cal.com/mohammad-noor",
    resume: "https://bynoor.io/mohammad-noor-abu-khlaif-software-engineer-resume.pdf",
    cv: "https://bynoor.io/mohammad-noor-abu-khlaif-software-engineer-resume.pdf",
    card: "/noor.vcf",
    vcard: "/noor.vcf",
    contact: "/noor.vcf",

    // Presentations & talks
    "ai-swe": "https://present.bynoor.io/ai-swe-2026/",
    ai: "https://present.bynoor.io/ai-swe-2026/",
    interview: "https://present.bynoor.io/interview/",
    market: "https://present.bynoor.io/market/",
    java: "https://present.bynoor.io/java/",

    // Guides & learning
    kit: "https://bynoor.io/technical-interview-preparation-kit/",
    prep: "https://bynoor.io/technical-interview-preparation-kit/",
    "interview-kit": "https://bynoor.io/technical-interview-preparation-kit/",
    youtube: "https://www.youtube.com/c/CodeWithNoor",
    yt: "https://www.youtube.com/c/CodeWithNoor",
    cwn: "https://www.youtube.com/c/CodeWithNoor",
    code: "https://www.youtube.com/c/CodeWithNoor",
    python: "https://www.youtube.com/playlist?list=PLaOfjyVFnPmW1sycl5qH3PH_vymkguOq8",
    py: "https://www.youtube.com/playlist?list=PLaOfjyVFnPmW1sycl5qH3PH_vymkguOq8",
    cpp: "https://www.youtube.com/playlist?list=PLaOfjyVFnPmXYSeCeSuitSai8FuM-IacQ",

    // Live apps, worlds & client launches
    aura: "https://aura.bynoor.io",
    nebula: "https://nebula.bynoor.io",
    present: "https://present.bynoor.io",
    talks: "https://present.bynoor.io",
    slides: "https://present.bynoor.io",
    void: "https://void.bynoor.io",
    areej: "https://areej.io/",
    hirefound: "https://mohnoor94.github.io/hire-found/",
    "hire-found": "https://mohnoor94.github.io/hire-found/",

    // Social & developer profiles
    linkedin: "https://www.linkedin.com/in/mohnoor94",
    in: "https://www.linkedin.com/in/mohnoor94",
    github: "https://github.com/mohnoor94",
    gh: "https://github.com/mohnoor94",
    noorguru: "https://github.com/NoorGuru",
    gobanana: "https://github.com/GoBanana-io",
    ig: "https://www.instagram.com/bynoor.io",
    instagram: "https://www.instagram.com/bynoor.io",
    x: "https://x.com/mohnoor94",
    twitter: "https://x.com/mohnoor94",
    sof: "https://stackoverflow.com/users/2847543/mohammad-noor",
    stackoverflow: "https://stackoverflow.com/users/2847543/mohammad-noor",
    email: "mailto:moh.noor94@gmail.com",
    mail: "mailto:moh.noor94@gmail.com",

    // Legacy backwards-compatible slugs (kept active, omitted from homepage)
    "tech-job": "https://present.bynoor.io/tech-job/",
    "youtube-main": "https://www.youtube.com/c/MohammadNoorAbuKhleif",
    apps: "https://play.google.com/store/apps/dev?id=6213463466804826025",
    threads: "https://threads.net/mohnoor94",
    fb: "https://web.facebook.com/moh.noor94",
    hr: "https://www.hackerrank.com/moh_noor94",
  };

  const FEATURED_SLUGS = [
    { slug: "ai-swe", label: "The AI-Augmented Software Engineer talk", url: REDIRECTS["ai-swe"] },
    { slug: "interview", label: "Cracking the Tech Job Interview", url: REDIRECTS.interview },
    { slug: "market", label: "Cracking the Tech Job Market", url: REDIRECTS.market },
    { slug: "present", label: "Present — Talks & slide decks", url: REDIRECTS.present },
    { slug: "aura", label: "Aura — AI financial intelligence", url: REDIRECTS.aura },
    { slug: "nebula", label: "Nebula — Startup playbooks", url: REDIRECTS.nebula },
    { slug: "void", label: "Void — Cosmic zoom experience", url: REDIRECTS.void },
    { slug: "kit", label: "Technical Interview Prep Kit", url: REDIRECTS.kit },
    { slug: "youtube", label: "Code with Noor (YouTube)", url: REDIRECTS.youtube },
    { slug: "python", label: "Python Masterclass (Arabic)", url: REDIRECTS.python },
    { slug: "cpp", label: "C++ for Beginners (Arabic)", url: REDIRECTS.cpp },
    { slug: "card", label: "Save contact card (.vcf)", url: REDIRECTS.card },
    { slug: "linkedin", label: "LinkedIn", url: REDIRECTS.linkedin },
    { slug: "github", label: "GitHub (@mohnoor94)", url: REDIRECTS.github },
    { slug: "noorguru", label: "NoorGuru Product Lab", url: REDIRECTS.noorguru },
    { slug: "gobanana", label: "GoBanana-io AI Tooling", url: REDIRECTS.gobanana },
    { slug: "ig", label: "Instagram (@bynoor.io)", url: REDIRECTS.ig },
    { slug: "x", label: "X (@mohnoor94)", url: REDIRECTS.x },
    { slug: "email", label: "Direct email", url: REDIRECTS.email },
    { slug: "book", label: "Book a 30-min conversation", url: REDIRECTS.book },
    { slug: "site", label: "Full portfolio (bynoor.io)", url: REDIRECTS.site },
    { slug: "resume", label: "Resume (PDF)", url: REDIRECTS.resume },
  ];

  const normalizeSlug = (pathname) => {
    if (!pathname) return "";
    let decoded = pathname;
    try {
      decoded = decodeURIComponent(pathname);
    } catch (_) {
      decoded = pathname;
    }
    return decoded.replace(/^\/+|\/+$/g, "").toLowerCase();
  };

  const resolveShortSlug = (pathname) => {
    const slug = normalizeSlug(pathname);
    if (!slug) {
      return { slug: "", url: null };
    }
    const url = Object.prototype.hasOwnProperty.call(REDIRECTS, slug) ? REDIRECTS[slug] : null;
    return { slug, url };
  };

  window.NOOR_REDIRECTS = REDIRECTS;
  window.NOOR_FEATURED_SLUGS = FEATURED_SLUGS;
  window.resolveShortSlug = resolveShortSlug;

  if (document.documentElement.dataset.redirectPage === "true") {
    const { slug, url } = resolveShortSlug(window.location.pathname);
    if (url) {
      document.documentElement.dataset.redirectState = "redirecting";
      window.location.replace(url);
    } else {
      document.documentElement.dataset.redirectState = "not-found";
      document.documentElement.dataset.missingSlug = slug;
    }
  }
})();
