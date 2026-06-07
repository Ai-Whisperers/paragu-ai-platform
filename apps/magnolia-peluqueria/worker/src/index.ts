export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    
    // Proxy ALL requests to Pages staging URL
    const stagingUrl = 'https://06aa2886.magnolia-peluqueria.pages.dev' + url.pathname + url.search;
    
    try {
      const response = await fetch(stagingUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
      
      // Return the response with same status
      return new Response(response.body, {
        status: response.status,
        headers: response.headers,
      });
    } catch (err) {
      return new Response('Service temporarily unavailable', { status: 503 });
    }
  }
};