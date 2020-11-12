import { Service } from "typedi";
import { Connection, Repository } from "typeorm";
import { InjectConnection, InjectRepository } from "typeorm-typedi-extensions";

import { Review } from "../database/entity";

@Service()
export class ReviewsService {
  @InjectConnection()
  private connection: Connection;

  @InjectRepository(Review)
  private repository: Repository<Review>;

  countReviews(bookId: number | string): Promise<number> {
    return this.repository.count({
      where: { bookId }
    });
  }

  async getAverageRating(bookId: number | string): Promise<number> {
    const raw = await this.repository
      .createQueryBuilder()
      .select("AVG(rating) AS avg")
      .where({ bookId })
      .getRawOne();

    return raw.avg;
  }

  create(attributes: Partial<Review>): Promise<Review> {
    const review = this.repository.create(attributes);
    return this.connection.manager.save(review);
  }
}
