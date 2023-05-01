export function useHttp() {
    async function send(options) {
        const params = options.params ? new URLSearchParams(options.params) : '';
        const response = await fetch(options.path + params.toString(), {
            method: options.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: options.body ? JSON.stringify(options.body) : null
        });
        return response.json();
    }

    return {
        get: (path, params = {}) => send({ method: 'GET', path, params }),
        post: (path, body) => send({ method: 'POST', path, body })
    };
}
