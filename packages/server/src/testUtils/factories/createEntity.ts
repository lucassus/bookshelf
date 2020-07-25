import { DeepPartial, getManager, ObjectType } from "typeorm";

export function createEntity<Entity>(
  entityClass: ObjectType<Entity>,
  attributes: DeepPartial<Entity>
): Promise<Entity> {
  const manager = getManager();

  const entity = manager.create(entityClass, attributes);
  return manager.save(entity);
}
