const themeLink = document.getElementById("themeStylesheet");
const savedTheme = localStorage.getItem("selectedTheme") || "lavender";
themeLink.href = `${savedTheme}.css`;