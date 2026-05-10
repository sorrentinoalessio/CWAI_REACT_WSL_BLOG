export const getPost = async (token) => {
    const response = await fetch('https://alessio-be.longwavestudio.dev/user/post/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `Errore HTTP: ${response.status}`);
    }

    return response.json();
};