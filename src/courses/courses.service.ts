import { Injectable, Scope } from "@nestjs/common";

@Injectable({
  scope: Scope.TRANSIENT, // TODO: Remove to revert to default?
})
export class CoursesService {
  create(course) {}
  findAll() {
    return [];
  }
  update() {}
  remove() {}
}
