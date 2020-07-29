import { AbstractRepository, EntityRepository } from "typeorm";

import { isPasswordValid } from "../../common/authentication";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  async authenticate(
    email: string,
    password: string
  ): Promise<undefined | User> {
    const user = await this.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .addSelect("user.passwordHash")
      .getOne();

    return user && isPasswordValid(password, user.passwordHash!)
      ? user
      : undefined;
  }
}
