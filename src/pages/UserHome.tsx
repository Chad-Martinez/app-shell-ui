import { Typography } from '@mui/material';
import { FC, ReactElement } from 'react';

const UserHome: FC = (): ReactElement | null => {
  return (
    <Typography variant='h4' color='#524d4d' gutterBottom>
      User Home
    </Typography>
  );
};

export default UserHome;
