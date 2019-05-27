export default class LouvorSchema {
  static schema = {
    name: 'Louvores',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      title: { type: 'string', indexed: true },
      tema: 'string',
      collection: 'string',
      tone: 'string',
      letra: 'string',
      lyrics: { type: 'string', indexed: true },
      number: { type: 'int', indexed: true, optional: true },
      lyrics_letra: 'string?',
      lyrics_chords: 'string?',
      lyrics_rithm: 'string?',
    },
  };
}
