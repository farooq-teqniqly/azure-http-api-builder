class PostRequestHandler {
  constructor() {}
  
  run(context, req) {
    if (!req.body || !req.body.name) {
      context.res = {
        status: 400,
        body: "Please pass a name in the body."
      };

      return;
    }

    context.res = {
      status: 201,
      body: `Hello ${req.body.name}`
    };
  }
}

module.exports = PostRequestHandler;
