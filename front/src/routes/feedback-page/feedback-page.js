import React from 'react';
import { Container, Content, FlexboxGrid } from 'rsuite';
import FeedbackPanel from '../../components/feedback-panel';

const FeedbackPage = () => {
  return (
    <div className="feedback-page">
      <Container>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <FeedbackPanel />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </div>
  );
};

export default FeedbackPage;
