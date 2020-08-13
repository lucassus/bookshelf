import { AbstractRepository, EntityRepository } from "typeorm";

import { isPasswordValid } from "../../common/authentication";
import { User } from "../entity";

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  async findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<undefined | User> {
    const user = await this.repository.findOne({ email });

    if (user && isPasswordValid(password, user.passwordHash!)) {
      return user;
    }

    return undefined;
  }
}
