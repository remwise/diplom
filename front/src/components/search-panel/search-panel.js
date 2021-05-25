import React, { useEffect, useState } from 'react';
import { DatePicker, Divider, Form, Icon, Input, InputGroup, Panel, SelectPicker } from 'rsuite';
import TextField from '../text-field';

import './search-panel.css';

const SearchPanel = () => {
  // const [searchText, setSearchText] = useState('');
  const [formValue, setFormValue] = useState({
    registerStartDate: null,
    registerEndDate: null,
    eventStartDate: null,
    eventEndDate: null,
    universityName: '',
    sort: 'default',
  });

  // useEffect(() => {

  // })

  return (
    <div>
      <h1>ПОИСК КОНФЕРЕНЦИЙ</h1>
      <InputGroup className="search-input" style={{ marginTop: '15px', marginBottom: '15px' }}>
        {/* <Input onChange={e => setSearchText(e)} value={searchText} /> */}
        <Input />
        <InputGroup.Addon>
          <Icon icon="search" />
        </InputGroup.Addon>
      </InputGroup>

      <Panel header="Фильтры" bordered collapsible>
        <Form layout="inline" onChange={e => setFormValue(e)} formValue={formValue}>
          <TextField name="registerStartDate" label="Начало регистрации не раньше" accepter={DatePicker} />
          <TextField name="registerEndDate" label="Окончание регистрации не позже" accepter={DatePicker} />
          <TextField name="universityName" label="Университет" />
          {/* <Divider /> */}
          <TextField name="eventStartDate" label="Начало события не раньше" accepter={DatePicker} />
          <TextField name="eventEndDate" label="Окончание события не позже" accepter={DatePicker} />
          <TextField
            name="sort"
            label="Сортировка"
            searchable={false}
            cleanable={false}
            appearance="subtle"
            data={[
              { label: 'По умолчанию', value: 'default' },
              { label: 'По названию', value: 'name' },
              { label: 'По дате регистрации', value: 'registerDate' },
              { label: 'По дате проведения', value: 'eventDate' },
            ]}
            accepter={SelectPicker}
          />
        </Form>
      </Panel>
    </div>
  );
};

export default SearchPanel;
