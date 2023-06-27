/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import { Grid, Pagination } from '@mui/material';
import { ChangeEvent, useState } from 'react';

type ImageTableProps = {
  images: ApiResponse[];
  pageChange: (value: number) => void;
  currentPage: number;
};

const ImageTable = ({ images, pageChange, currentPage }: ImageTableProps) => {
  const [page, setPage] = useState(currentPage);

  const handlePageChange = (page: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    pageChange(value);
  };

  return (
    <Grid item xs={12} container alignItems='center' justifyContent='center'>
      <Grid item xs={12}>
        <ImageList sx={{ width: '100%', height: 550 }}>
          <ImageListItem key='Subheader' cols={2}>
            <ListSubheader component='div'>Photos from NASA</ListSubheader>
          </ImageListItem>
          {images.map((item: ApiResponse) => {
            const title = (
              <ul>
                <li>Camera: {item.camera.full_name}</li>
                <li>Date: {item.earth_date}</li>
                <li>Sol: {item.sol}</li>
              </ul>
            );
            return (
              <ImageListItem key={item.id}>
                <img
                  src={`${item.img_src}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img_src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={'Nasa Image'}
                  loading='lazy'
                />
                <ImageListItemBar
                  title={title}
                  subtitle={'Photo from NASA'}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${title}`}
                    ></IconButton>
                  }
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Grid>
      <Grid item xs={12} container alignItems='center' justifyContent='center'>
        <Pagination count={100} page={page || 1} onChange={handlePageChange} />
      </Grid>
    </Grid>
  );
};

export default ImageTable;
