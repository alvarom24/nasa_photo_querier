'use client';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  SelectChangeEvent,
  styled,
  useScrollTrigger,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

/* Constants */
import { AllowedCameras, ApiRovers } from './constants/content';

/* Components */
import RoverSelector from '@/app/components/RoverSelector';
import CameraSelector from '@/app/components/CameraSelector';

import DateField from '@/app/components/DateFiled';
import { buildUrlParams } from './utils/core.utils';
import { getPhotos } from './services/query.service';
import ImageTable from '@/app/components/ImageTable';

const MarginTopContainer = styled(Grid)(() => ({
  marginTop: '4px',
}));
const TableContainer = styled(Grid)(() => ({
  marginTop: '4px',
  minHeight: '400px',
  border: '4px dotted',
  margin: '24px',
}));
const StyledMainContainer = styled(Grid)(() => ({
  position: 'absolute',
  left: '7%',
  backgroundColor: '#ffffff',
  textAlign: 'center',
  width: '86%',
}));
const StyledButton = styled(Button)(() => ({
  width: '200px',
  height: '40px',
}));

export default function Home() {
  const [rover, setRover] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [availableCamerasForRover, setAvailableCamerasForRover] = useState<
    AllowedCamera[]
  >([]);
  const [photoData, setPhotoData] = useState<ApiResponse[]>([]);
  const [queryParameters, setQueryParameters] = useState<QueryParametersDef>({
    rover: '',
    camera: '',
    sol: '',
    earth_date: '',
    page: '1',
  });
  const [page, setPage] = useState(1);
  let hasDate = queryParameters.earth_date || queryParameters.sol;

  const handleRoverChange = (event: SelectChangeEvent): void => {
    const selectedRover = event.target.value;
    setRover(selectedRover);
    setQueryParameters({ ...queryParameters, rover: selectedRover, page: '1' });
  };

  const handleCameraChange = (event: string): void => {
    setQueryParameters({ ...queryParameters, camera: event, page: '1' });
  };

  const handleDateChange = (event: DateChangeEvent): void => {
    setQueryParameters({
      ...queryParameters,
      [event.type]: event.value,
      page: '1',
    });
  };

  const handlePageChange = (value: number): void => {
    setQueryParameters({ ...queryParameters, page: `${value}` });
    setPage(value);
  };

  const fetchPhotos = async () => {
    if (queryParameters.rover && hasDate) {
      setIsLoading(true);
      setPhotoData([]);
      const parameters = buildUrlParams(queryParameters);
      const response = await getPhotos(parameters);
      setPhotoData(response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const availableCameras = AllowedCameras.filter((camera: AllowedCamera) =>
      camera.allowedRovers.includes(rover)
    );
    setAvailableCamerasForRover(availableCameras);
  }, [rover]);

  useEffect(() => {
    fetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledMainContainer container>
        <Grid xs={12} item>
          <h1> Welcome to NASA Photo Querier</h1>
        </Grid>
        <Grid
          xs={12}
          container
          spacing={4}
          display='flex'
          alignItems='space-between'
          justifyContent='center'
        >
          <Grid xs={5} item>
            <RoverSelector onChange={handleRoverChange} />
          </Grid>
          <Grid xs={5} item>
            <CameraSelector
              onChange={handleCameraChange}
              cameras={availableCamerasForRover}
            />
          </Grid>
        </Grid>

        <MarginTopContainer
          xs={12}
          container
          spacing={2}
          display='flex'
          alignItems='flex-end'
          justifyContent='center'
        >
          <DateField onChange={handleDateChange} />
          <StyledButton
            variant='contained'
            onClick={() => {
              fetchPhotos();
            }}
            disabled={!queryParameters.rover || !hasDate}
          >
            Search Photos
          </StyledButton>
        </MarginTopContainer>

        {isLoading ? (
          <TableContainer
            xs={12}
            container
            spacing={1}
            display='flex'
            justifyContent='center'
            alignContent='center'
          >
            {' '}
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </TableContainer>
        ) : (
          <TableContainer
            xs={12}
            container
            spacing={1}
            display='flex'
            justifyContent='center'
            alignContent='center'
          >
            {photoData.length > 0 ? (
              <ImageTable
                currentPage={parseInt(queryParameters.page)}
                images={photoData}
                pageChange={handlePageChange}
              />
            ) : (
              'Data not found'
            )}
          </TableContainer>
        )}
      </StyledMainContainer>
    </LocalizationProvider>
  );
}
