import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "username",
      passwordField: "password",
    });
  }

  async validate(
    username: string,
    password: string,
    done: (err: any, user?: any) => void,
  ) {
    // Assuming 'role' is sent as part of the request, you might need to access it differently
    const role = "lecturer"; // This should be dynamically determined, e.g., from request body

    let user;

    if (role === "lecturer") {
      user = await this.authService.validateLecturer({ username, password });
    } else if (role === "learner") {
      user = await this.authService.validateLearner({ username, password });
    }

    if (!user) {
      return done(new UnauthorizedException(), null);
    }

    return done(null, user);
  }
}
