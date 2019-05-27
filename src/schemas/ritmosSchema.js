export default class RitmoSchema {
  static schema = {
    name: 'Ritmos',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      name: 'string',
      sequence: 'string[]',
      louvoresIn: 'string?[]',
    },
  };
}
