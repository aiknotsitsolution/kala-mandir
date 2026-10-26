const API_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/+$/, "");

async function requestApi(path, options) {
    let response;
    try {
        response = await fetch(`${API_URL}${path}`, options);
    } catch (error) {
        if (error.name === "AbortError") throw error;
        throw new Error("Could not connect to the Kala Mandir server. Check the backend connection and try again.");
    }

    const result = await response.json().catch(() => null);
    if (!response.ok || !result || result.success === false) {
        throw new Error(result?.message || `Request failed (${response.status})`);
    }
    return result?.data;
}

export function fetchApi(path, { signal } = {}) {
    return requestApi(path, { signal });
}

export async function postApi(path, body) {
    return requestApi(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
}
