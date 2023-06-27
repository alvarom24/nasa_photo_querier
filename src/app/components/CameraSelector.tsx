import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';

type CameraSelectorProps = {
  onChange: (event: string) => void;
  cameras: AllowedCamera[];
};

const CameraSelector = ({ onChange, cameras }: CameraSelectorProps) => {
  const [camera, setCamera] = useState('');

  const handleChange = (event: SelectChangeEvent): void => {
    setCamera(event.target.value);
    onChange(event.target.value);
  };

  useEffect(() => {
    setCamera('');
  }, [cameras]);

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id='rover-select-label'>Cameras</InputLabel>
        <Select
          labelId='rover-select-label'
          id='rover-select'
          value={camera}
          label='Cameras'
          onChange={handleChange}
          input={<OutlinedInput label='Name' />}
        >
          {cameras.map((camera: AllowedCamera, index: number) => {
            return (
              <MenuItem value={camera.abbreviation} key={camera.abbreviation}>
                {camera.camera}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CameraSelector;
