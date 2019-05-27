/* eslint-disable func-names */
/* eslint-disable no-extend-native */
const fields = {
  name: 'Nome',
  email: 'Email',
  password: 'Senha',
  lyrics: 'Letra',
  tema: 'Tema',
  collections: 'Coleção',
  title: 'Título',
  tone: 'Tonalidade',
};

function isArray(value) {
  return value && typeof value === 'object' && value.constructor === Array;
}

String.prototype.replaceAll = function (search, replacement) {
  const target = this;
  return target.split(search).join(replacement);
};

const errorHandler = (e) => {
  const error = e.response.data.errors;
  if (isArray(error)) {
    let errorReturn = {};

    error.map((err) => {
      let { message } = err;
      const { path } = err;
      message = message.replaceAll(path, fields[path]);
      errorReturn = { ...errorReturn, [path]: message };
      return errorReturn;
    });
    return errorReturn;
  }
  if (error.type) {
    let errorReturn = {};
    let { message } = error;
    const { path } = error;
    message = message.replaceAll(path, fields[path]);
    errorReturn = { ...errorReturn, [path]: message };
    return errorReturn;
  }

  return { default: error };
};

export default errorHandler;
