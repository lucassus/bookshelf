import { Service } from "typedi";
import { Connection, Repository } from "typeorm";
import { InjectConnection, InjectRepository } from "typeorm-typedi-extensions";

import { Avatar, User } from "~/infra/database/entity";
import { hashPassword } from "~/infra/support/passwords";

@Service()
export class UsersService {
  @InjectConnection()
  private connection: Connection;

  @InjectRepository(User)
  private repository: Repository<User>;

  findAll() {
    return this.repository.find({ order: { name: "ASC" } });
  }

  findByIdOrFail(id: string | number) {
    return this.repository.findOneOrFail(id);
  }

  async create(
    userAttributes: Partial<User> & { password: string },
    avatarAttributes: Partial<Avatar>
  ): Promise<User> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const avatar = queryRunner.manager.create(Avatar, avatarAttributes);
      await queryRunner.manager.save(avatar);

      const user = queryRunner.manager.create(User, {
        ...userAttributes,
        passwordHash: hashPassword(userAttributes.password),
        avatar
      });
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();

      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  register(userAttributes: { name: string; email: string; password: string }) {
    const defaultAvatarAttributes = {
      imagePath: "/users/avatar-placeholder.png",
      color: "green"
    };

    return this.create(userAttributes, defaultAvatarAttributes);
  }

  update(user: User, userAttributes: Partial<User>): Promise<User> {
    return this.repository.save(this.repository.merge(user, userAttributes));
  }

  delete(id: string | number) {
    return this.repository.delete(id);
  }

  async checkUniquenessOfEmail(
    email: string,
    user: undefined | User = undefined
  ) {
    const otherUser = await this.repository
      .createQueryBuilder()
      .where({ email })
      .getOne();

    if (otherUser === undefined) {
      return true;
    }

    if (user !== undefined) {
      return otherUser.id === user.id;
    }

    return false;
  }
}
