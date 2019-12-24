import { IRequestHandler } from "./request-handler";

export class Api {
  protected handlerMap: Map<string, IRequestHandler> = new Map<string, IRequestHandler>();

  public for(method: string, requestHandler: IRequestHandler): Api {

    if (method.length === 0) {
      throw Error("Specify an HTTP method.");
    }

    if (this.handlerMap.has(method.toUpperCase())) {
      throw Error(`A handler for HTTP method='${method}' has already been added. Only one handler can be added for a given HTTP method.`);
    }

    this.handlerMap.set(method.toUpperCase(), requestHandler);
    return this;
  }

  public go(context: any, req: any): void {
    if (!context) {
      throw Error("No context was passed.");
    }

    if (!req) {
      throw Error("No request was passed.");
    }

    const method: string = req.method.toUpperCase();

    const handler = this.handlerMap.get(method);

    if (!handler) {
      throw Error(`No handler found for HTTP method='${method}'.`);
    }

    handler.run(context, req);
  }
}
