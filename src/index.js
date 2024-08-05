addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);
    const segments = url.pathname.split('/').filter(segment => segment);

    if (segments.length === 0) {
        return new Response('Not Found', { status: 404 });
    }

    const [base, category, file] = segments;

    switch (base) {
        case 'components':
            if (!category) {
                // Serve the HTML file when no category or file is specified
                return handleHtmlRequest();
            } else {
                return handleComponentRequest(category, file);
            }
        default:
            return new Response('Not Found', { status: 404 });
    }
}

async function handleHtmlRequest() {
    const htmlUrl = 'https://prajapatihet.github.io/hospitalinfo-api/components.html';

    try {
        // Fetch the HTML content
        const response = await fetch(htmlUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/html'
            }
        });

        // Check if the response is okay
        if (!response.ok) {
            return new Response('Failed to fetch HTML content', { status: response.status });
        }

        // Return the HTML content with CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        };

        return new Response(await response.text(), {
            headers: {
                'Content-Type': 'text/html',
                ...corsHeaders
            }
        });
    } catch (error) {
        // Handle any errors that occurred during fetching or processing
        return new Response('Internal Server Error', { status: 500 });
    }
}

async function handleComponentRequest(category, file) {
    const fetchUrls = {
        'accordions': 'https://prajapatihet.github.io/code-canvas/components/accordions/accordions.json',
        'backgrounds': 'https://prajapatihet.github.io/code-canvas/components/backgrounds/backgrounds.json',
        'breadcrumbs': 'https://prajapatihet.github.io/code-canvas/components/breadcrumbs/breadcrumbs.json',
        'buttons': 'https://prajapatihet.github.io/code-canvas/components/buttons/buttons.json'
    };

    const url = fetchUrls[category];

    if (!url || file !== `${category}.json`) {
        return new Response('Not Found', { status: 404 });
    }

    try {
        // Fetch data from the external URL
        const response = await fetch(url, {
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
