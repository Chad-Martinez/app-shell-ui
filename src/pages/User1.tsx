import { Typography } from '@mui/material';
import { FC, ReactElement } from 'react';

const User1: FC = (): ReactElement | null => {
  return (
    <Typography variant='h4' color='#524d4d' gutterBottom>
      User 1
    </Typography>
  );
};

export default User1;
