import React, { useState, useEffect } from 'react';

import { Container, Input, Icone } from './styles';

export default function Search({
 openSidebar, navigation, returnTo, value 
}) {
  const [query, setquery] = useState('');

  useEffect(() => {
    if (value) setquery(value);
  }, []);

  return (
    <Container>
      <Icone name="bars" color="#536274" size={25} onPress={openSidebar} />
      <Input
        value={query}
        onChangeText={setquery}
        placeholder="Pesquise por número, titulo, letra"
        placeholderTextColor="#536274"
        returnKeyType="search"
        onSubmitEditing={() => navigation.navigate('LSearch', { query, returnTo })
        }
      />
    </Container>
  );
}
