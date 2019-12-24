class DeleteRequestHandler {
  constructor() {}

  run(context, req) {
    context.res = {
      status: 204
    };
  }
}

module.exports = DeleteRequestHandler;
