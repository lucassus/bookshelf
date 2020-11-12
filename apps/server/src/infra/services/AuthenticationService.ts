import { User } from "@/infra/database/entity";
import { isPasswordValid } from "@/infra/support/passwords";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

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
