import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log("in RoleMiddleware: TODO Check this");
    next();
  }
}
