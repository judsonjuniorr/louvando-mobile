import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';

import {
  //
  Container,
  Content,
  Header,
  Message,
  Title,
  Subtitle,
} from './styles';

export default function SuccessModal({ title, subtitle }) {
  const [modalVisible, setmodalVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setmodalVisible(false);
    }, 3000);
  }, []);

  return (
    <Container>
      <Modal
        isVisible={modalVisible}
        backdropOpacity={0.5}
        onBackdropPress={() => setmodalVisible(false)}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <Content>
          <Header>
            <Icon name="check-circle" size={75} color="#fff" />
          </Header>
          <Message>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
          </Message>
        </Content>
      </Modal>
    </Container>
  );
}
