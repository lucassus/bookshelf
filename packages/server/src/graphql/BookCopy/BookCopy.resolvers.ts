import { User } from "../../database/entity/User";
import { BookCopyRepository } from "../../database/repositories/BookCopyRepository";
import { Context } from "../../types";
import { Resolvers } from "../resolvers-types.generated";

export const resolvers: Resolvers<Context> = {
  BookCopy: {
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
    // TODO: Raise error when user is not authenticated
    borrowBookCopy: (rootValue, { id }, { connection, currentUser }) =>
      currentUser
        ? connection.manager
            .getCustomRepository(BookCopyRepository)
            .borrow(id, currentUser.id)
        : null,

    returnBookCopy: (rootValue, { id }, { connection }) =>
      connection.manager.getCustomRepository(BookCopyRepository).return(id)
  }
};
