const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function fetchApi(path, { signal } = {}) {
    const response = await fetch(`${API_URL}${path}`, { signal });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.success === false) {
        throw new Error(result?.message || `Request failed (${response.status})`);
    }
    return result?.data;
}

export async function postApi(path, body) {
    const response = await fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.success === false) {
        throw new Error(result?.message || `Request failed (${response.status})`);
    }
    return result?.data;
}
