import React from 'react';
import { FlexboxGrid, Content, Container } from 'rsuite';

import RegisterPanel from '../../components/register-panel';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <Container>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <RegisterPanel />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </div>
  );
};

export default RegisterPage;
