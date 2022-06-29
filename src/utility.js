export async function apiPost(url, query) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({query}),
    });
    if (response.ok) {
        let data = response.json()
        return data;
    }
}

export async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        let data = response.json();
        return data;
    }
}