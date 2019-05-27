import React, { useState, useEffect } from 'react';

import api from '~/services/api';
import errorHandler from '~/services/errorHandler';
import saveUser from '~/services/saveUser';

import SuccessModal from '~/components/SuccessModal';

import {
  Container,
  Logo,
  Form,
  FormGroup,
  Input,
  Submit,
  Links,
  LinksText,
  Divider,
  Icone,
  SubmitText,
  ErrorBox,
} from './styles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [recoverSuccess, setRecoverSuccess] = useState(
    navigation.getParam('recoverSuccess') || false,
  );
  const [submittingText, setsubmittingText] = useState('Conectar');
  let passwordInput;

  useEffect(() => {
    if (recoverSuccess) {
      setTimeout(() => {
        setRecoverSuccess(false);
      }, 4000);
    }
  }, []);

  async function handleLogin() {
    setSubmitting(true);
    setErrors({});
    setsubmittingText('Conectando...');

    try {
      const { data: user } = await api.post('/user/authenticate', {
        email,
        password,
      });
      await saveUser(user);

      setSubmitting(false);
      setEmail('');
      setPass('');
      navigation.navigate('Coletanea');
    } catch (error) {
      setsubmittingText('Conectar');
      setSubmitting(false);
      await setErrors(errorHandler(error));
    }
  }

  return (
    <Container>
      {recoverSuccess && (
        <SuccessModal
          title="Email enviado!"
          subtitle="O email de recuperação já foi enviado
para sua caixa de mensagem."
        />
      )}
      <Logo source={require('~/assets/logo/logo.png')} />

      {errors && errors.default && <ErrorBox>{errors.default}</ErrorBox>}

      <Form blurRadius={recoverSuccess ? 4 : 0}>
        <FormGroup>
          <Icone name="group" size={22} color="rgba(255,255,255,0.75)" />
          <Input
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
            onSubmitEditing={() => handleLogin()}
          />
        </FormGroup>
        <Submit onPress={handleLogin} disabled={submitting}>
          <SubmitText>{submittingText}</SubmitText>
        </Submit>
      </Form>

      <Links>
        <LinksText onPress={() => navigation.navigate('PasswordForgot')}>
          Esqueceu a senha?
        </LinksText>
        <Divider>|</Divider>
        <LinksText onPress={() => navigation.navigate('NewAccount')}>
          Criar nova conta
        </LinksText>
      </Links>
    </Container>
  );
}
