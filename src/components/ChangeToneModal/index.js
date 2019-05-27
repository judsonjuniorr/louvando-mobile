import React from 'react';
import Modal from 'react-native-modal';

import {
  //
  Container,
  Content,
  Header,
  Message,
  Title,
  ToneBox,
  Tone,
} from './styles';

export default function SuccessModal({
  changeModal,
  changeModalFn,
  tone,
  toneChange,
}) {
  let tones = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab'];
  if (tone && tone.indexOf('m') > -1) {
    tones = [
      'Am',
      'Bbm',
      'Bm',
      'Cm',
      'C#m',
      'Dm',
      'Ebm',
      'Em',
      'Fm',
      'F#m',
      'Gm',
      'G#m',
    ];
  }
  return (
    <Container>
      <Modal
        isVisible={changeModal}
        backdropOpacity={0.5}
        onBackdropPress={changeModalFn}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <Content>
          <Header>
            <Title>ALTERAR TONALIDADE</Title>
          </Header>
          <Message>
            {tones.map(t => (
              <ToneBox
                key={Math.random()}
                disabled={t === tone}
                onPress={() => {
                  toneChange(t);
                }}
              >
                <Tone>{t}</Tone>
              </ToneBox>
            ))}
          </Message>
        </Content>
      </Modal>
    </Container>
  );
}
