import { User } from "../database/entity/User";
import { secureId } from "../database/helpers";
import { BookCopyRepository } from "../database/repositories/BookCopyRepository";
import { Resolvers } from "../resolvers-types.generated";
import { Context } from "../types";
import { id } from "./common";

export const resolvers: Resolvers<Context> = {
  BookCopy: {
    id,

    // TODO: A workaround for user.avatar eager loading, see https://github.com/typeorm/typeorm/issues/2315
    owner: (bookCopy, args, { connection }) =>
      connection.manager.findOneOrFail(User, bookCopy.ownerId),

    // TODO: A workaround for user.avatar eager loading, see https://github.com/typeorm/typeorm/issues/2315
    borrower: (bookCopy, args, { connection }) =>
      bookCopy.borrowerId
        ? connection.manager.findOneOrFail(User, bookCopy.borrowerId)
        : null
  },

  Mutation: {
    borrowBookCopy: (rootValue, args, { connection, currentUser }) =>
      currentUser
        ? connection.manager
            .getCustomRepository(BookCopyRepository)
            .borrow(secureId.toInternal(args.id), currentUser.id)
        : null,

    returnBookCopy: (rootValue, args, { connection }) =>
      connection.manager
        .getCustomRepository(BookCopyRepository)
        .return(secureId.toInternal(args.id))
  }
};
