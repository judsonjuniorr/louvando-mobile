export default class UserSchema {
  static schema = {
    name: 'Temas',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      name: 'string',
      louvores: 'int',
    },
  };
}
