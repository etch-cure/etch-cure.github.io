if (!document.getElementById("dark-theme")) {
    var darkTheme = document.createElement('link')
    darkTheme.id = "dark-theme"
    darkTheme.rel = "stylesheet"
    darkTheme.href = "/assets/css/main_dark.css"
    document.head.appendChild(darkTheme);
}

if (matchMedia('(prefers-color-scheme: dark)').matches) {
    let toggleThemeBtn = document.getElementById("toggle_dark_theme")
    if (toggleThemeBtn) {
        toggleThemeBtn.checked = true
    }
    darkTheme.disabled = false
} else {
    darkTheme.disabled = true
}

function changeTheme() {
    darkTheme.disabled = !darkTheme.disabled
}
