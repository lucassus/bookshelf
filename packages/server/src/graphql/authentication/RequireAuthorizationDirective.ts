/* eslint-disable no-param-reassign */
import { SchemaDirectiveVisitor } from "@graphql-tools/utils";
import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import {
  defaultFieldResolver,
  GraphQLField,
  GraphQLInterfaceType,
  GraphQLObjectType
} from "graphql";

import { Context } from "../../common/types";
import { Role } from "../resolvers-types.generated";

// TODO: It's a generic that can take the Context
export class RequireAuthorizationDirective extends SchemaDirectiveVisitor {
  visitObject(type: GraphQLObjectType<any, Context>) {
    this.ensureFieldWrapped(type);
    (type as any).$requireAuthorization = this.args.role;
  }

  visitFieldDefinition(
    field: GraphQLField<any, Context>,
    details: {
      objectType: GraphQLObjectType | GraphQLInterfaceType;
    }
  ) {
    this.ensureFieldWrapped(details.objectType);
    (field as any).$requireAuthorization = this.args.role;
  }

  private ensureFieldWrapped(
    objectType: GraphQLObjectType | GraphQLInterfaceType
  ) {
    if ((objectType as any).$requireAuthorizationFieldsWrapped) return;
    (objectType as any).$requireAuthorizationFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.entries(fields).forEach(([, field]) => {
      const originalResolve = field.resolve || defaultFieldResolver;

      field.resolve = function (rootValue, args, context, info) {
        const role: Role =
          (field as any).$requireAuthorization ||
          (objectType as any).$requireAuthorization;

        if (!role) {
          return originalResolve.call(this, rootValue, args, context, info);
        }

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
    });
  }
}
