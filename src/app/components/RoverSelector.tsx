import { ApiRovers } from '@/app/constants/content';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';

type RoverSelectorProps = {
  onChange: (event: SelectChangeEvent) => void;
};

const RoverSelector = ({ onChange }: RoverSelectorProps) => {
  const [rover, setRover] = useState('');

  const handleChange = (event: SelectChangeEvent): void => {
    setRover(event.target.value);
    onChange(event);
  };
  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id='rover-select-label'>Rover</InputLabel>
        <Select
          labelId='rover-select-label'
          id='rover-select'
          value={rover}
          label='Rover'
          onChange={handleChange}
        >
          <MenuItem value={ApiRovers.curiosity}>Curiosity</MenuItem>
          <MenuItem value={ApiRovers.opportunity}>Opportunity</MenuItem>
          <MenuItem value={ApiRovers.spirit}>Spirit</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default RoverSelector;
