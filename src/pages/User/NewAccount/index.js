import React, { useState } from 'react';
import api from '~/services/api';
import errorHandler from '~/services/errorHandler';
import saveUser from '~/services/saveUser';

import {
  Container,
  Logo,
  Form,
  FormGroup,
  Input,
  Submit,
  Links,
  LinksText,
  Icone,
  SubmitText,
  ErrorText,
} from '~/pages/User/Login/styles';

export default function NewAccount({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  let emailInput;
  let passwordInput;

  async function handleSubmit() {
    setSubmitting(true);
    setErrors({});

    try {
      await api.post('/user', { name, email, password });
      const { data: user } = await api.post('/user/authenticate', {
        email,
        password,
      });
      await saveUser(user);

      setSubmitting(false);
      setEmail('');
      setPass('');
      navigation.navigate('Coletanea', { newAccSuccess: true });
    } catch (error) {
      setSubmitting(false);
      await setErrors(errorHandler(error));
    }
  }

  return (
    <Container>
      <Logo source={require('~/assets/logo/logo.png')} />

      <Form>
        <FormGroup>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Nome"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => emailInput.focus()}
            blurOnSubmit={false}
            autoFocus
          />
        </FormGroup>
        {errors && errors.name && <ErrorText>{errors.name}</ErrorText>}
        <FormGroup>
          <Icone name="group" size={22} color="rgba(255,255,255,0.75)" />
          <Input
            ref={(input) => {
              emailInput = input;
            }}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => passwordInput.focus()}
            blurOnSubmit={false}
          />
        </FormGroup>
        {errors && errors.email && <ErrorText>{errors.email}</ErrorText>}
        <FormGroup>
          <Icone name="lock-outline" size={22} color="rgba(255,255,255,0.75)" />
          <Input
            ref={(input) => {
              passwordInput = input;
            }}
            value={password}
            onChangeText={setPass}
            placeholder="Senha"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            returnKeyType="go"
            blurOnSubmit={false}
            onSubmitEditing={() => handleSubmit()}
          />
        </FormGroup>
        {errors && errors.password && <ErrorText>{errors.password}</ErrorText>}
        <Submit disabled={submitting} onPress={handleSubmit}>
          <SubmitText>Criar conta</SubmitText>
        </Submit>
      </Form>

      <Links>
        <LinksText onPress={() => navigation.navigate('Login')}>
          Já tem uma conta?
        </LinksText>
      </Links>
    </Container>
  );
}
