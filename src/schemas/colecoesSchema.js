export default class UserSchema {
  static schema = {
    name: 'Colecoes',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      name: 'string',
      louvores: 'int',
    },
  };
}
