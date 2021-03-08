const redirections = {
    "akf": "https://www.abukhleif.com/",
    "apps": "https://play.google.com/store/apps/dev?id=6213463466804826025",
    "cv": "https://drive.google.com/file/d/0B2215F1Cj2_0ZF9FVFlpNXhSUmM/view",
};

const getLongUrl = (shortUrl) => redirections[shortUrl] || "https://www.noor.guru/";

const redirect = () => {
    const currentPage = window.location.href;
    const shortUrl = currentPage?.split("/")?.pop()?.split("?")?.shift() || "";
    window.location.replace(getLongUrl(shortUrl));
}

redirect();