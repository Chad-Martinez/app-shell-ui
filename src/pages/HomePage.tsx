import { Typography } from '@mui/material';
import { FC, ReactElement } from 'react';

const HomePage: FC = (): ReactElement | null => {
  return (
    <Typography variant='h4' color='#524d4d' gutterBottom>
      Auth Shell
    </Typography>
  );
};

export default HomePage;
