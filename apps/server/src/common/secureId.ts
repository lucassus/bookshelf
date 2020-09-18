import { SecureId } from "@bookshelf/secure-id";

const secureId = new SecureId<string>({
  separator: "-"
});

export const toInternalIdAndType = (id: string) =>
  secureId.toInternalAndType(id);

export const toInternalId = (id: string) => secureId.toInternal(id);

export const toExternalId = (entity: { id: number }): string =>
  secureId.toExternal(
    entity.id,
    Object.getPrototypeOf(entity).constructor.name
  );
