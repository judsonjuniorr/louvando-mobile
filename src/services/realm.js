import Realm from 'realm';

import autoresSchema from '~/schemas/autoresSchema';
import colecoesSchema from '~/schemas/colecoesSchema';
import louvoresSchema from '~/schemas/louvoresSchema';
import ritmosSchema from '~/schemas/ritmosSchema';
import temasSchema from '~/schemas/temasSchema';
import UserSchema from '~/schemas/UserSchema';

export default function getRealm() {
  return Realm.open({
    schema: [
      autoresSchema,
      colecoesSchema,
      louvoresSchema,
      ritmosSchema,
      temasSchema,
      UserSchema,
    ],
  });
}
