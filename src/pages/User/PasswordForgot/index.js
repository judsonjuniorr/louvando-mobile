import React, { useState } from 'react';
import api from '~/services/api';
import errorHandler from '~/services/errorHandler';

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
  ErrorBox,
} from '~/pages/User/Login/styles';

export default function PasswordForgot({ navigation }) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitText, setsubmitText] = useState('Recuperar senha');

  async function handleSubmit() {
    setSubmitting(true);
    setErrors({});
    setsubmitText('Enviando email...');

    try {
      await api.post('/user/forgot_password', { email });
      setSubmitting(false);
      setEmail('');
      setsubmitText('Recuperar senha');
      navigation.navigate('Login', { recoverSuccess: true });
    } catch (error) {
      await setErrors(errorHandler(error));
      setSubmitting(false);
      setsubmitText('Recuperar senha');
    }
  }

  return (
    <Container>
      <Logo source={require('~/assets/logo/logo.png')} />

      {errors && errors.default && <ErrorBox>{errors.default}</ErrorBox>}

      <Form>
        <FormGroup>
          <Icone name="group" size={22} color="rgba(255,255,255,0.75)" />
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            returnKeyType="go"
            blurOnSubmit={false}
            onSubmitEditing={() => handleSubmit()}
          />
        </FormGroup>
        <Submit onPress={handleSubmit} disabled={submitting}>
          <SubmitText>{submitText}</SubmitText>
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
