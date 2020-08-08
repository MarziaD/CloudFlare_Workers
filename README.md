# Cloudflare Workers 


Using Cloudflare Workers, I deployed an application that will randomly send users to one of two webpages. I used Cloudflare Workers API, command-line tool Wrangler, and deployed the app on the workers.dev deployment playground.

## Resources Used

- [Workers Quick Start documentation](https://developers.cloudflare.com/workers/quickstart/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [HTMLRewriter](https://developers.cloudflare.com/workers/reference/apis/html-rewriter/)
- [Cookie documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)


## Requirements of the task

### 1. Request the URLs from the API

Make a fetch request inside of your script's event handler to the URL `https://cfw-takehome.developers.workers.dev/api/variants`, and parse the response as JSON. The response will be an array of URLs, which should be saved to a variable.

### 2. Request a (random: see #3) variant

Make a fetch request to one of the two URLs, and return it as the response from the script.

### 3. Distribute requests between variants

The `/api/variants` API route will return an array of two URLs. Requests should be evenly distributed between the two urls, in A/B testing style. This means that when a client makes a request to the Workers script, the script should roughly return each variant around 50% of the time.

### 4. Persisting variants

If a user visits the site and receives one of the two URLs, persist which URL is chosen in a cookie so that they always see the same variant when they return to the application. 


## Deployment
The link of the deployment is https://cloudflare_project.marziadeodato.workers.dev/




