class GetRequestHandler {
  constructor() {}
  
  run(context, req) {
    if (!req.query.name) {
      context.res = {
        status: 400,
        body: "Please pass a name on the query string."
      };

      return;
    }

    context.res = {
      status: 200,
      body: `Hello ${req.query.name}`
    };
  }
}

module.exports = GetRequestHandler;
