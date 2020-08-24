import { Service } from "typedi";
import { Connection, Repository } from "typeorm";
import { InjectConnection, InjectRepository } from "typeorm-typedi-extensions";

import { hashPassword } from "../../common/passwords";
import { Avatar, User } from "../../database/entity";

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

      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: string | number,
    userAttributes: Partial<User>
  ): Promise<User> {
    const user = await this.findByIdOrFail(id);
    return this.repository.save(this.repository.merge(user, userAttributes));
  }

  delete(id: string | number) {
    return this.repository.delete(id);
  }
}
