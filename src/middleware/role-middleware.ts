import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.role = req.body.role;
    next();
  }
}
