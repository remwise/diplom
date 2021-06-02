import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Col, FlexboxGrid, Footer, Icon } from 'rsuite';

import './app-footer.css';

const AppFooter = () => {
  let location = useLocation();

  if (location.pathname !== '/feedback') {
    return (
      <Footer className="footer">
        <FlexboxGrid justify="center" className="footer-content">
          <FlexboxGrid.Item colspan={20} className="footer-content">
            <FlexboxGrid justify="space-between" align="middle" className="footer-content">
              <FlexboxGrid.Item componentClass={Col} lg={20} md={19} sm={14} xs={12}>
                <p className="footer-text">Copyright © 2021 Алтайский государственный технический университет</p>
                <p className="footer-text">Designed By: Andrey Komarov</p>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item componentClass={Col} lg={4} md={5} sm={10} xs={12}>
                <Link to="/feedback" className="feedback-button">
                  <Button className="feedback-button">
                    <Icon size="lg" icon="envelope" /> Обратная связь
                  </Button>
                </Link>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Footer>
    );
  }

  return null;
};

export default AppFooter;
