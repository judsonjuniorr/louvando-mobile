export default class UserSchema {
  static schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      profiles: 'string[]',
      name: 'string',
      email: 'string',
      token: 'string',
      updated_at: 'date',
    },
  };
}
