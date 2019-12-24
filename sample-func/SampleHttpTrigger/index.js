const Api = require('../../dist/api').Api;
const GetRequestHandler = require('./handlers/get-request-handler');
const PostRequestHandler = require('./handlers/post-request-handler');
const PutRequestHandler = require('./handlers/put-request-handler');
const DeleteRequestHandler = require('./handlers/delete-request-handler');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    new Api()
        .for("GET", new GetRequestHandler())
        .for("POST", new PostRequestHandler())
        .for("PUT", new PutRequestHandler())
        .for("DELETE", new DeleteRequestHandler())
        .go(context, req);
};