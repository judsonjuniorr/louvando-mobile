/* eslint-disable no-unused-expressions */
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {
 Container, ProgressBar, InfoBox, Page, IconLink 
} from './styles';

export default function Pagination({
  component,
  actualPage,
  totalPage,
  navigation,
  params = {},
}) {
  return (
    <Container>
      {totalPage > 1 && <ProgressBar actual={actualPage} total={totalPage} />}
      {totalPage > 1 && (
        <InfoBox>
          <IconLink
            onPress={() => {
              actualPage === 1
                ? null
                : navigation.navigate(component, {
                    ...params,
                    page: actualPage - 1,
                  });
            }}
          >
            <Icon
              name="ios-arrow-back"
              size={28}
              color={actualPage === 1 ? 'rgba(240,48,97,.5)' : '#F03061'}
            />
          </IconLink>
          <Page>
            Página {actualPage}/{totalPage}
          </Page>
          <IconLink
            onPress={() => {
              actualPage === totalPage
                ? null
                : navigation.navigate(component, {
                    ...params,
                    page: actualPage + 1,
                  });
            }}
          >
            <Icon
              name="ios-arrow-forward"
              size={28}
              color={
                actualPage === totalPage ? 'rgba(240,48,97,.5)' : '#F03061'
              }
            />
          </IconLink>
        </InfoBox>
      )}
    </Container>
  );
}
