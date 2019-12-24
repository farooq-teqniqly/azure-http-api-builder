import * as chai from "chai";
import * as _ from "lodash";
import "mocha";

import { Api } from "../src/api";
import { IRequestHandler } from "../src/request-handler";

const expect = chai.expect;

describe("ApiBuilder tests", () => {
  describe("for()", () => {
    it ("configures the builder", () => {
      // tslint:disable-next-line: no-empty
      const requestHandler: IRequestHandler = {run: (context, req) => {}};
      const builder = new Api().for("GET", requestHandler)
        .for("POST", requestHandler);

      expect(builder).to.not.eq(null);
    });

    describe("error conditions", () => {
      let api: Api;
      let errorHandled: boolean;
      let caughtError: any;
      // tslint:disable-next-line: no-empty
      const requestHandler: IRequestHandler = {run: (context, req) => {}};

      beforeEach(() => {
        api = new Api();
        errorHandled = false;
      });

      it ("throws error when HTTP method not specified.", () => {
        try {
          api.for("", requestHandler);
        } catch (error) {
          errorHandled = true;
          caughtError = error;
        }

        expect(errorHandled).to.eq(true);
        expect(caughtError.message).to.eq("Specify an HTTP method.");
      });

      it ("throws error when a handler for the given HTTP method has already been added.", () => {
        try {
          api.for("GET", requestHandler)
            .for("GET", requestHandler);

        } catch (error) {
          errorHandled = true;
          caughtError = error;
        }

        expect(errorHandled).to.eq(true);
        expect(caughtError.message).to.eq("A handler for HTTP method='GET' has already been added. Only one handler can be added for a given HTTP method.");
      });
    });
  });

  describe("go()", () => {
    describe("error conditions", () => {
      let api: Api;
      // tslint:disable-next-line: no-empty
      const requestHandler: IRequestHandler = {run: (context, req) => {}};
      let errorHandled: boolean = false;
      let caughtError: any;

      beforeEach(() => {
        api = new Api().for("GET", requestHandler);
      });

      it("throws error when context not specified", () => {
        try {
          api.go(null, {});
        } catch (error) {
          errorHandled = true;
          caughtError = error;
        }

        expect(errorHandled).to.eq(true);
        expect(caughtError.message).to.eq("No context was passed.");
      });

      it("throws error when request not specified", () => {
        try {
          api.go({}, null);
        } catch (error) {
          errorHandled = true;
          caughtError = error;
        }

        expect(errorHandled).to.eq(true);
        expect(caughtError.message).to.eq("No request was passed.");
      });

      it("throws error when handler was not added", () => {
        try {
          new Api().go({}, {method: "GET"});
        } catch (error) {
          errorHandled = true;
          caughtError = error;
        }

        expect(errorHandled).to.eq(true);
        expect(caughtError.message).to.eq("No handler found for HTTP method='GET'.");
      });

    });
    it("calls handler's run method", () => {
      let handlerCalled: boolean = false;
      const requestHandler: IRequestHandler = {run: (context, req) => {
        handlerCalled = true;
      }};

      const api = new Api().for("GET", requestHandler)
        .go({}, {method: "GET"});

      expect(handlerCalled).to.eq(true);
    });
  });
});
