import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { isPasswordValid } from "../../common/passwords";
import { User } from "../../database/entity";

@Service()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async findUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new Error("Invalid email!");
    }

    if (!isPasswordValid(password, user.passwordHash)) {
      throw new Error("Invalid password!");
    }

    return user;
  }
}
