import { Author } from "@/infra/database/entity";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class AuthorsService {
  @InjectRepository(Author)
  private repository: Repository<Author>;

  findAll(): Promise<Author[]> {
    return this.repository.find();
  }
}
