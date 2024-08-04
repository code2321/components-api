addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);
    const segments = url.pathname.split('/').filter(segment => segment);

    if (segments.length === 0) {
        return new Response('Not Found', { status: 404 });
    }

    const [base, id] = segments;

    switch (base) {
        case 'components':
            return handleComponentRequest(id);
        default:
            return new Response('Not Found', { status: 404 });
    }
}

async function handleComponentRequest() {
    try {
        // Fetch data from the external URL
        const response = await fetch('https://prajapatihet.github.io/code-canvas/components/cards/cards.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check if the response is okay
        if (!response.ok) {
            return new Response('Failed to fetch data', { status: response.status });
        }

        // Parse the JSON data
        const data = await response.json();

        // Return all data with CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        };

        return new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                ...corsHeaders
            }
        });
    } catch (error) {
        // Handle any errors that occurred during fetching or processing
        return new Response('Internal Server Error', { status: 500 });
    }
}
