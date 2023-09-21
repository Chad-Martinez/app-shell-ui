import { Container, Box, LinearProgress } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { verifyEmail } from '../services/auth-service';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const params = useParams();
  const { verifyId } = params;

  const verify = useCallback(async (): Promise<void> => {
    try {
      if (verifyId) {
        const response = await verifyEmail(verifyId);
        toast.success(response.data.message, { toastId: 'verify-success' });
        setIsVerified(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, {
          toastId: 'verify-error',
        });
        setIsVerified(false);
      }
    }
  }, [verifyId]);

  useEffect(() => {
    verify();
    setIsLoading(false);
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
        {!isLoading && isVerified ? (
          <h3>
            Your email has been verified please <Link to='/login'>login</Link>{' '}
            to continue
          </h3>
        ) : !isLoading && !isVerified ? (
          <h3>Your email could not be verified at this time.</h3>
        ) : (
          <Box>
            <h3>Email verification in progress...</h3>
            <LinearProgress />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default VerifyEmail;
