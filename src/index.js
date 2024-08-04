async function handleComponentRequest(id) {
    const component = components[id];
    if (component) {
        return new Response(JSON.stringify(component), {
            headers: { 'Content-Type': 'application/json' }
        });
    } else {
        return new Response('Component Not Found', { status: 404 });
    }
}

async function handleRequest(request) {
    const url = new URL(request.url);
    const segments = url.pathname.split('/').filter(segment => segment);

    if (segments.length === 0) {
         return new Response('Not Found', { status: 404 });
    }

    const [base, id] = segments;

    switch (base) {
        case 'components':
            return handleBloodbankRequest(id, url.searchParams);
        default:
            return new Response('Not Found', { status: 404 });
    }
}
