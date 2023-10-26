import { Typography } from '@mui/material';
import { FC, ReactElement } from 'react';

const Profile: FC = (): ReactElement | null => {
  return (
    <Typography variant='h4' color='#524d4d' gutterBottom>
      Profile
    </Typography>
  );
};

export default Profile;
