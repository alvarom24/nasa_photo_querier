import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Grid, TextField } from '@mui/material';
import dayjs from 'dayjs';

type DateFieldProps = {
  onChange: (event: DateChangeEvent) => void;
};

const DateField = ({ onChange }: DateFieldProps) => {
  const [dateType, setDateType] = useState('sol');
  const [selectedValue, setSelectedValue] = useState('');

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setDateType(value);
    setSelectedValue('');
    onChange({
      type: value === 'earth' ? 'earth_date' : 'sol',
      value: '',
    });
  };

  const handleValueChange = (value: string | null) => {
    let queryParameter = '';
    if (dateType === 'earth') {
      queryParameter = `${dayjs(value).format('YYYY-M-D')}`;
    } else {
      queryParameter = `${value}`;
    }

    onChange({
      type: dateType === 'earth' ? 'earth_date' : 'sol',
      value: queryParameter,
    });

    setSelectedValue(queryParameter);
  };

  return (
    <Grid item>
      <Grid item xs={12}>
        <FormControl>
          <FormLabel id='demo-row-radio-buttons-group-label'>
            Date Type
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
            value={dateType}
            onChange={handleTypeChange}
          >
            <FormControlLabel
              value='sol'
              control={<Radio />}
              label='Sol Date'
            />
            <FormControlLabel
              value='earth'
              control={<Radio />}
              label='Earth Date'
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        {dateType === 'earth' ? (
          <DatePicker
            value={selectedValue}
            onChange={newValue => handleValueChange(newValue)}
          />
        ) : (
          <TextField
            type='number'
            id='outlined-basic'
            label='Sol Date'
            variant='outlined'
            onChange={e => handleValueChange(e.target.value)}
            value={selectedValue}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default DateField;
