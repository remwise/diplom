import { FormGroup, FormControl, ControlLabel, HelpBlock, DatePicker } from 'rsuite';

const TextField = ({ label, required, ...props }) => {
  const block = required ? <HelpBlock tooltip>Обязательно к заполнению</HelpBlock> : null;
  const dataInputParams =
    props.accepter === DatePicker
      ? {
          placeholder: 'ДД.ММ.ГГГГ',
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
          oneTap: true,
          format: 'DD.MM.YYYY',
        }
      : null;
  return (
    <FormGroup>
      <ControlLabel>{label} </ControlLabel>
      <FormControl {...props} {...dataInputParams} />
      {block}
    </FormGroup>
  );
};

export default TextField;
