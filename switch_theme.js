const themeLink = document.getElementById("themeStylesheet");
const themeSelector = document.getElementById("themeDropdown");

const savedTheme = localStorage.getItem("selectedTheme") || "lavender";
themeLink.href= `${savedTheme}.css`;
themeSelector.value = savedTheme;

themeSelector.addEventListener("change", ()=>{
    const selected = themeSelector.value;
    themeLink.href= `${selected}.css`;
    localStorage.setItem("selectedTheme", selected);
});