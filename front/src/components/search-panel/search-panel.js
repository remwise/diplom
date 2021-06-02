import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Icon,
  Input,
  InputGroup,
  Panel,
  SelectPicker,
  Animation,
  FlexboxGrid,
  Row,
  Col,
} from 'rsuite';
import TextField from '../text-field';

import './search-panel.css';

const { Fade, Collapse, Transition } = Animation;

// const Temp = React.forwardRef(({ ...props }, ref) => (
//   <div {...props} ref={ref}>
//     {/* <Form layout="inline" onChange={e => setFormValue(e)} formValue={formValue}> */}
//     <Form layout="inline">
//       {/* <TextField name="registerStartDate" label="Начало регистрации не раньше" accepter={DatePicker} /> */}
//       <TextField name="registerEndDate" label="Окончание регистрации не позже" accepter={DatePicker} />
//       <TextField name="universityName" label="Университет" />
//       {/* <Divider /> */}
//       <TextField name="eventStartDate" label="Начало события не раньше" accepter={DatePicker} />
//       <TextField name="eventEndDate" label="Окончание события не позже" accepter={DatePicker} />
//       <TextField
//         name="sort"
//         label="Сортировка"
//         searchable={false}
//         cleanable={false}
//         appearance="subtle"
//         data={[
//           { label: 'По умолчанию', value: 'default' },
//           { label: 'По названию', value: 'name' },
//           { label: 'По дате регистрации', value: 'registerDate' },
//           { label: 'По дате проведения', value: 'eventDate' },
//         ]}
//         accepter={SelectPicker}
//       />
//     </Form>
//   </div>
// ));

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

  const [show, setShow] = useState(false);

  // useEffect(() => {

  // })

  return (
    <div>
      <h2 className="search-panel-title">Поиск конференций</h2>
      {/* <InputGroup className="search-input" style={{ marginTop: '15px', marginBottom: '15px' }}> */}
      {/* <Input onChange={e => setSearchText(e)} value={searchText} /> */}
      <Row>
        <Col xs={14}>
          <Input />
        </Col>
        <Col xs={6}>
          <Button onClick={() => setShow(!show)}>Фильтры</Button>
        </Col>
      </Row>

      {/* <InputGroup.Addon> */}
      {/* <Icon icon="search" /> */}
      {/* </InputGroup.Addon> */}
      {/* </InputGroup> */}

      <Collapse in={show}>
        {(props, ref) => (
          <div {...props} ref={ref}>
            {/* <Form layout="inline" onChange={e => setFormValue(e)} formValue={formValue}> */}
            <Form layout="inline">
              {/* <TextField name="registerStartDate" label="Начало регистрации не раньше" accepter={DatePicker} /> */}
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
          </div>
        )}
      </Collapse>

      {/* <Panel header="Фильтры" bordered collapsible> */}
      {/* <div>
        <Form layout="inline" onChange={e => setFormValue(e)} formValue={formValue}>
          <TextField name="registerStartDate" label="Начало регистрации не раньше" accepter={DatePicker} />
          <TextField name="registerEndDate" label="Окончание регистрации не позже" accepter={DatePicker} />
          <TextField name="universityName" label="Университет" />
          <Divider />
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
      </div> */}
      {/* </Panel> */}
    </div>
  );
};

export default SearchPanel;
