import getRealm from '~/services/realm';

async function saveUser(user) {
  const data ={
    id: user.user._id,
    profiles: user.user.profiles,
    name: user.user.name,
    email: user.user.email,
    token: user.token,
    updated_at: user.user.updatedAt
  }
  const realm = await getRealm();

  realm.write(() => {
    realm.create('User', data, 'modified');
  });
}

export default saveUser;