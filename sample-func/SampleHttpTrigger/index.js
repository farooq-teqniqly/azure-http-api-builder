const Api = require('../../dist/api').Api;
const {
    GetRequestHandler, 
    PostRequestHandler, 
    PutRequestHandler, 
    DeleteRequestHandler} = require('./handlers');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    new Api()
        .for("GET", new GetRequestHandler())
        .for("POST", new PostRequestHandler())
        .for("PUT", new PutRequestHandler())
        .for("DELETE", new DeleteRequestHandler())
        .go(context, req);
};