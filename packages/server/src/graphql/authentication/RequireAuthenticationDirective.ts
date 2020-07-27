import {
  AuthenticationError,
  SchemaDirectiveVisitor,
  ForbiddenError
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

      const isAuthenticated = !!currentUser;
      if (role === "USER" && !isAuthenticated) {
        throw new AuthenticationError("Unauthorized access! Please log in.");
      }

      const isAdmin = currentUser && currentUser.isAdmin;
      if (role === "ADMIN" && !isAdmin) {
        throw new ForbiddenError(
          "Unauthorized access! Please log in as admin."
        );
      }

      return originalResolve.call(this, rootValue, args, context, info);
    };
  }
}
