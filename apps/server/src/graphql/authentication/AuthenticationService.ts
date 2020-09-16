import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { isPasswordValid } from "../../common/passwords";
import { User } from "../../database/entity";

export class InvalidEmailOrPasswordError extends Error {}

@Service()
export class AuthenticationService {
  @InjectRepository(User)
  private usersRepository: Repository<User>;

  async findUserByEmailAndPasswordOrFail(
    email: string,
    password: string
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new InvalidEmailOrPasswordError("Invalid email!");
    }

    if (!isPasswordValid(password, user.passwordHash)) {
      throw new InvalidEmailOrPasswordError("Invalid password!");
    }

    return user;
  }
}
