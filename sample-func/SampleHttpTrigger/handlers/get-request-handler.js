class GetRequestHandler {
  constructor() {}
  
  run(context, req) {
    if (!req.query.name) {
      context.res = {
        status: 400,
        body: "Please pass a name on the query string."
      };

      context.done();
      return;
    }

    context.res = {
      status: 200,
      body: `Hello ${req.query.name}`
    };

    context.done();
  }
}

module.exports = GetRequestHandler;
