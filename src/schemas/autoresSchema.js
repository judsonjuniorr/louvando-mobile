export default class AutorSchema {
  static schema = {
    name: 'Autores',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      name: 'string',
      initials: 'string',
      louvores: 'int',
    },
  };
}
