import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Icon, Nav } from 'rsuite';

import { getStore as getDigestStore } from '../../stores/digest';

const digestStore = getDigestStore();

const styles = {
  marginBottom: 50,
};

const ConferenceNav = observer(({ active, onSelect, conference_id, ...props }) => {
  useEffect(() => {
    digestStore.getDigests({ conference_id });
  }, []);

  const navItems = digestStore.digests
    ? digestStore.digests.map(el => {
        return (
          <React.Fragment>
            <Nav.Item disabled>Сборники:</Nav.Item>
            <Nav.Item key={el.digest_id} eventKey={el.digest_id}>
              {el.publication_year}
            </Nav.Item>
          </React.Fragment>
        );
      })
    : null;

  return (
    <Nav {...props} activeKey={active} onSelect={onSelect} style={styles}>
      <Nav.Item eventKey="home" icon={<Icon icon="home" />}>
        Событие
      </Nav.Item>
      {navItems}
    </Nav>
  );
});

export default ConferenceNav;
