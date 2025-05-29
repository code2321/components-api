# Components API

This project is a Cloudflare Worker that serves UI component data and an HTML page.
It provides access to various pre-built UI components by fetching data from an external source.

## Endpoints

This API provides the following endpoints:

### HTML Page

*   **`/components`**: Serves an HTML page located at [https://prajapatihet.github.io/hospitalinfo-api/components.html](https://prajapatihet.github.io/hospitalinfo-api/components.html). This page likely showcases or allows interaction with the components.

### JSON Data Endpoints

These endpoints provide JSON data for various UI components. The data is fetched from `https://prajapatihet.github.io/code-canvas/components/`.

*   `/components/accordions/accordions.json`
*   `/components/backgrounds/backgrounds.json`
*   `/components/breadcrumbs/breadcrumbs.json`
*   `/components/buttons/buttons.json`
*   `/components/cards/cards.json`
*   `/components/carousels/carousels.json`
*   `/components/dropdowns/dropdowns.json`
*   `/components/footers/footers.json`
*   `/components/forms/forms.json`

Each endpoint returns the JSON data specific to that component category.

## Project Structure

Key files in this project include:

*   `src/index.js`: This is the main entry point for the Cloudflare Worker. It contains the routing logic and handlers for incoming requests.
*   `wrangler.toml`: The configuration file for Wrangler, the Cloudflare Workers CLI. It defines the project name, entry point, compatibility date, and other settings for deployment.
*   `package.json`: Defines project metadata, scripts, and dependencies.

## Deployment

This API is deployed as a Cloudflare Worker. The deployment process is automated using GitHub Actions, as defined in the `.github/workflows/DeployToCloudflare.yml` workflow file.

## How to Use / Examples

You can interact with the API using any HTTP client, such as `curl` or Postman.

### Accessing the HTML Page

To fetch the HTML page (though typically accessed via a browser):

```bash
curl <YOUR_WORKER_URL>/components
```
*Replace `<YOUR_WORKER_URL>` with the actual deployed Cloudflare Worker URL.*

### Accessing JSON Data for a Component

To fetch the JSON data for the "buttons" component:

```bash
curl <YOUR_WORKER_URL>/components/buttons/buttons.json
```
*Replace `<YOUR_WORKER_URL>` with the actual deployed Cloudflare Worker URL.*

This will return a JSON response containing the data for buttons. You can use similar requests for other component categories by changing `buttons` to `accordions`, `cards`, etc.
