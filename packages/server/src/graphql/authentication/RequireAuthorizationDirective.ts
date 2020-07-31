import {
  AuthenticationError,
  ForbiddenError,
  SchemaDirectiveVisitor
} from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";

import { Context } from "../../common/types";
import { Role } from "../resolvers-types.generated";

export class RequireAuthorizationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, Context>) {
    const role = this.args.role as Role;
    const originalResolve = field.resolve || defaultFieldResolver;

    // eslint-disable-next-line no-param-reassign
    field.resolve = function (rootValue, args, context, info) {
      const { currentUser } = context;

      const isAuthenticated = !!currentUser;
      if ([Role.User, Role.Admin].includes(role) && !isAuthenticated) {
        throw new AuthenticationError("Unauthorized access! Please log in.");
      }

      const isAdmin = currentUser && currentUser.isAdmin;
      if (role === Role.Admin && !isAdmin) {
        throw new ForbiddenError(
          "Unauthorized access! Please log in as admin."
        );
      }

      return originalResolve.call(this, rootValue, args, context, info);
    };
  }
}
