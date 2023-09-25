import { Typography } from '@mui/material';
import { FC, ReactElement, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAdminResource } from '../services/admin-service';
import { AxiosError } from 'axios';

const Admin1: FC = (): ReactElement | null => {
  const adminResource = useCallback(async (): Promise<void> => {
    try {
      await getAdminResource();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, { toastId: 'admin1-error' });
      }
      console.log(error);
    }
  }, []);

  useEffect(() => {
    adminResource();
  }, [adminResource]);

  return (
    <Typography variant='h4' color='#524d4d' gutterBottom>
      Admin 1
    </Typography>
  );
};

export default Admin1;
