export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/knoxville-wedding-venues") {
      url.pathname += "/";
      return Response.redirect(url, 308);
    }
    if (url.pathname.startsWith("/knoxville-wedding-venues/")) {
      url.pathname = url.pathname.slice("/knoxville-wedding-venues".length);
      return env.ASSETS.fetch(new Request(url, request));
    }
    return env.ASSETS.fetch(request);
  },
};
