import {
  AuthenticationError,
  ForbiddenError,
  SchemaDirectiveVisitor
} from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";

import { Context } from "../../common/types";

export class RequireAuthenticationDirective extends SchemaDirectiveVisitor {
  // eslint-disable-next-line class-methods-use-this
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { role } = this.args;
    const originalResolve = field.resolve || defaultFieldResolver;

    // eslint-disable-next-line no-param-reassign
    field.resolve = function (rootValue, args, context: Context, info) {
      const { currentUser } = context;

      if (role === "USER" && !currentUser) {
        throw new AuthenticationError("Unauthorized access! Please log in.");
      }

      if (role === "ADMIN" && !(currentUser && currentUser.isAdmin)) {
        throw new ForbiddenError(
          "Unauthorized access! Please log in as admin."
        );
      }

      return originalResolve.call(this, rootValue, args, context, info);
    };
  }
}
