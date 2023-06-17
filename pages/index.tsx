import {Typography,  Box,  Card,  Container,  Button,  styled,    Grid,  CardHeader,  CardContent,  Divider} from '@mui/material';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
// import Link from 'src/components/Link';
import Head from 'next/head';
import Logo from 'src/components/LogoSign';
// import Hero from 'src/content/Overview/Hero';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useRouter } from 'next/router';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);


function Overview() {
  // console.log('----------------CLIENT ENVIRONMENT VARIABLES TEST----------------')
  // console.log('process.env.NODE_ENV : ', process.env.NODE_ENV)
  // console.log('process.env.NEXT_PUBLIC_API_URL: ', process.env.NEXT_PUBLIC_API_URL)
  const apiUrl=process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter(); 
  const handleLogin = async (e) => {
    e.preventDefault();
    setOpen(false);
    setLoading(true);
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    debugger;
    if (response.ok) {
      setLoading(false);
      router.push('/dashboards/crypto');
    }else{
      setOpen(true)
      setLoading(false);
    }
  };

  return (
    <OverviewWrapper>
      <Head>
        <title>Voipbin</title>
      </Head>

      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            {/* <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
              <Box>
                <Button
                  component={Link}
                  href="/dashboards/crypto"
                  variant="contained"
                  sx={{ ml: 2 }}
                >
                  Live Preview
                </Button>
              </Box>
            </Box> */}
          </Box>
        </Container>
      </HeaderWrapper>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={3}>
            <Card>
              <CardHeader title="Login" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="ID"
                      value={username} onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                  <TextField
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                  {/* <Button
                  component={Link}
                  href="/dashboards/crypto"
                  variant="contained"
                  sx={{ width: 1}}
                  onClick={handleLogin}
                >
                  Login
                </Button>                     */}
                  <LoadingButton
                    onClick={handleLogin}
                    loading={loading}
                    variant="outlined"
                    sx={{ width: 1}}
                  >
                    <span>Login</span>
                  </LoadingButton>                
                  </div>
                  <Collapse in={open} sx={{ marginTop: '10px' }}> 
                    <Alert variant="outlined" severity="error">
                      Login Fail..
                    </Alert>
                  </Collapse>                  
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>



      {/* <Hero /> */}
      {/* <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography textAlign="center" variant="subtitle1">
          Crafted by{' '}
          <Link
            href="https://bloomui.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            BloomUI.com
          </Link>
        </Typography>
      </Container> */}
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
