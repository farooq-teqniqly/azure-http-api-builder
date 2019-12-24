export interface IRequestHandler {
  run(context: any, req: any): void;
}
