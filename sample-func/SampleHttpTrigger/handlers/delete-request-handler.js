class DeleteRequestHandler {
  constructor() {}

  run(context, req) {
    context.res = {
      status: 204
    };

    context.done();
  }
}

module.exports = DeleteRequestHandler;
