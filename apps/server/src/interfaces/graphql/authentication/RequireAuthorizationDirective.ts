/* eslint-disable no-param-reassign */
import { SchemaDirectiveVisitor } from "@graphql-tools/utils";
import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import { defaultFieldResolver, GraphQLObjectType } from "graphql";

import { Role } from "../../../types/resolvers.generated";
import { Context } from "../context";

export class RequireAuthorizationDirective extends SchemaDirectiveVisitor<
  { role: Role },
  Context
> {
  visitObject(type) {
    this.ensureFieldWrapped(type);
    (type as any).$requireAuthorizationRole = this.args.role;
  }

  visitFieldDefinition(field, details) {
    this.ensureFieldWrapped(details.objectType);
    (field as any).$requireAuthorizationRole = this.args.role;
  }

  // eslint-disable-next-line class-methods-use-this
  private ensureFieldWrapped(objectType: GraphQLObjectType<any, Context>) {
    if ((objectType as any).$requireAuthorizationFieldsWrapped) return;
    (objectType as any).$requireAuthorizationFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.values(fields).forEach((field) => {
      const originalResolve = field.resolve || defaultFieldResolver;

      field.resolve = function (rootValue, args, context, info) {
        const role: Role =
          (field as any).$requireAuthorizationRole ||
          (objectType as any).$requireAuthorizationRole;

        if (!role) {
          return originalResolve.call(this, rootValue, args, context, info);
        }

        const { currentUser } = context;

        const isAuthenticated = currentUser !== undefined;
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
    });
  }
}
