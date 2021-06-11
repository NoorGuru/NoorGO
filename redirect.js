const redirections = {
    "akf": "https://www.abukhleif.com/",
    "apps": "https://play.google.com/store/apps/dev?id=6213463466804826025",
    "cv": "https://drive.google.com/file/d/0B2215F1Cj2_0ZF9FVFlpNXhSUmM/view",
    "twitter": "https://twitter.com/moh_noor94",
    "fb": "https://web.facebook.com/moh.noor94",
    "linkedin": "https://www.linkedin.com/in/mohnoor94/",
    "github": "https://github.com/mohnoor94",
    "email": "mailto:moh.noor94@gmail.com",
    "youtube": "https://www.youtube.com/c/CodewithNoor/",
    "youtube-main": "https://www.youtube.com/c/MohammadNoorAbuKhleif",
    "ig": "https://www.instagram.com/mohnoor94/",
    "sof": "https://stackoverflow.com/users/2847543/mohammad-noor",

    // C++ Files
    "cpp-fts": "https://1drv.ms/b/s!AnR5_MGIlB3e72UGY6djrr2v5uXy",
    "cpp-ftq1": "https://1drv.ms/b/s!AnR5_MGIlB3e72ki6llgN-pEmQ5Z",
    "cpp-ftq2": "https://www.abukhleif.com/first-exam-important-questions/",
    "cpp-sds1": "https://1drv.ms/b/s!AnR5_MGIlB3e72Soidf48IJz93eA",
    "cpp-sds2": "https://1drv.ms/b/s!AnR5_MGIlB3e72Soidf48IJz93eA",
    "cpp-sdq1": "https://1drv.ms/b/s!AnR5_MGIlB3e70lVF0ECLRIpd8tm",
    "cpp-sdq2": "https://www.abukhleif.com/cpp-second-exam-write-function-past-papers/",
    "cpp-sdq3": "https://www.abukhleif.com/pattern-programs/",
    "cpp-fls": "https://1drv.ms/b/s!AnR5_MGIlB3e70iHhYr8aGXhtPuC",
    "cpp-flq": "https://1drv.ms/b/s!AnR5_MGIlB3e70W4gP1sjOm4iea2",
    "cpp-ex": "https://www.abukhleif.com/category/c/cppexercises/",
};

const getLongUrl = (shortUrl) => redirections[shortUrl] || "https://www.noor.guru/";

const redirect = () => {
    const currentPage = window.location.href;
    const shortUrl = currentPage?.split("/")?.pop()?.split("?")?.shift() || "";
    window.location.replace(getLongUrl(shortUrl));
}

redirect();