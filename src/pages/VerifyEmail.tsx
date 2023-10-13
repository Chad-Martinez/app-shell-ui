import { Container, Box, LinearProgress } from '@mui/material';
import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { verifyEmail } from '../services/auth-service';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';

const VerifyEmail: FC = (): ReactElement | null => {
  const [emailMessage, setEmailMessage] = useState<ReactElement>(
    <Box>
      <h3>Email verification in progress...</h3>
      <LinearProgress />
    </Box>
  );

  const params = useParams<string>();
  const { verifyId } = params;

  const verify = useCallback(async (): Promise<void> => {
    try {
      if (verifyId) {
        const response: AxiosResponse<any, any> = await verifyEmail(verifyId);
        toast.success(response.data.message, { toastId: 'verify-success' });
        setEmailMessage(
          <h3>
            Your email has been verified please <Link to='/login'>login</Link>{' '}
            to continue
          </h3>
        );
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, {
          toastId: 'verify-error',
        });
        setEmailMessage(
          <h3>Your email could not be verified at this time.</h3>
        );
      }
    }
  }, [verifyId]);

  useEffect((): void => {
    verify();
  }, [verify]);

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {emailMessage}
      </Box>
    </Container>
  );
};

export default VerifyEmail;
