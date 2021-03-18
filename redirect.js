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
};

const getLongUrl = (shortUrl) => redirections[shortUrl] || "https://www.noor.guru/";

const redirect = () => {
    const currentPage = window.location.href;
    const shortUrl = currentPage?.split("/")?.pop()?.split("?")?.shift() || "";
    window.location.replace(getLongUrl(shortUrl));
}

redirect();