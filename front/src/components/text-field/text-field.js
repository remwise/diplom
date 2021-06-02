import { FormGroup, FormControl, ControlLabel, HelpBlock, DatePicker, DateRangePicker } from 'rsuite';

const TextField = ({ label, required, style, ...props }) => {
  const block = required ? <HelpBlock tooltip>Обязательно к заполнению</HelpBlock> : null;
  const acc = props.accepter;
  let dataInputParams = null;

  if (acc === DatePicker || acc === DateRangePicker) {
    dataInputParams = {
      ranges: [],
      isoWeek: true,
      locale: {
        sunday: 'Вс',
        monday: 'Пн',
        tuesday: 'Вт',
        wednesday: 'Ср',
        thursday: 'Чт',
        friday: 'Пт',
        saturday: 'Сб',
        ok: 'ОК',
        today: 'Сегодня',
        yesterday: 'Вчера',
        hours: 'Часы',
        minutes: 'Минуты',
        seconds: 'Секунды',
      },
    };

    dataInputParams.format = props.format ? props.format : 'DD.MM.YYYY';

    if (acc === DatePicker) {
      dataInputParams.placeholder = 'Выберите дату';
      dataInputParams.oneTap = true;
    } else {
      dataInputParams.placeholder = 'Выберите диапозон';
      dataInputParams.showOneCalendar = true;
    }
  }
  return (
    <FormGroup style={style}>
      <ControlLabel>{label} </ControlLabel>
      <FormControl {...props} {...dataInputParams} />
      {block}
    </FormGroup>
  );
};

export default TextField;
