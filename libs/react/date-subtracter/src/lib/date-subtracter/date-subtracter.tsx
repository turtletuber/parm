import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

import './date-subtracter.scss';
import { start } from 'repl';

/* eslint-disable-next-line */
export interface DateSubtracterProps {}

/** regex
 * matching yyyy-md-dd
 */
const yyyymmdd = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

const formatDate = (date: Date) => date.toISOString().split('T')[0];

const diffDays = (a: Date, b: Date) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(a);
  const secondDate = new Date(b)
  return Math.round(Math.abs((+secondDate - +firstDate) / oneDay));
}

const useField = ({ label, value }) => {
  const [_value, setValue] = useState(value);
  const [hasBlurred, setBlurred] = useState(false);
  const onBlur = () => setBlurred(true);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const validate = value => {
    return yyyymmdd.test(value);
  }
  const field = (
    <TextField
      style={{ width: '100%' }}
      label={label}
      placeholder="yyyy-mm-dd"
      multiline
      value={_value}
      onChange={handleChange}
      onBlur={onBlur}
      error={hasBlurred && validate(value) !== true}
      helperText={hasBlurred && validate(value)}
    />
  );
  return {
    value: _value, field
  };
}

export const DateSubtracter = (props: DateSubtracterProps) => {
  const {
    value: startValue,
    field: start,
  } = useField({ label: 'Start', value: ''});
  const {
    value: endValue,
    field: end,
  } = useField({ label: 'End', value: formatDate(new Date())});
  return (
    <div>
      {start}
      {end}
      Diff in days: {diffDays(startValue, endValue)}
    </div>
  );
};

export default DateSubtracter;
