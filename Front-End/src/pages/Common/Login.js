import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebaseAuth } from "../../components/FirebaseContext";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Logo from '../../assets/SEAMSENSE - Copy.png'; // Add your logo image here

function Login() {
  const [input, setInput] = useState({ email: "", password: "" });
  const { login, authError } = useFirebaseAuth();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let email = input.email.toLowerCase().trim();
      let password = input.password;
      await login(email, password);
      window.location = "/dashboard";
    } catch (err) {
      setError(authError);
    }
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#f8f8f8' }}>
      <Grid container>
        {/* Left Image Panel */}
        <Grid item xs={12} sm={5} sx={{ height: '100vh', display: { xs: 'none', sm: 'block' } }}>
          <Box sx={{ height: '100%' }}>
            <img
              src="https://img.freepik.com/free-photo/woman-tailor-working-sewing-factory_1303-15841.jpg"
              alt="login"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Grid>

        {/* Login Form Panel */}
        <Grid item xs={12} sm={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
          <Paper elevation={10} sx={{ padding: '40px', width: '100%', maxWidth: 500, borderRadius: 2 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <img src={Logo} alt="Seamsense Logo" style={{ width: '120px', marginBottom: '20px' }} />
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Welcome to Seamsense,
              </Typography>
              <Typography variant="h6" sx={{ color: '#555' }}>
                Sign In to Continue
              </Typography>
            </Box>

            <form autoComplete="off" onSubmit={handleSubmit}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                Enter Your Email:
              </Typography>
              <TextField
                name="email"
                variant="outlined"
                fullWidth
                type="email"
                value={input.email}
                onChange={handleChange}
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#999' },
                    '&:hover fieldset': { borderColor: '#333' },
                    '&.Mui-focused fieldset': { borderColor: '#000' },
                  },
                }}
              />

              <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                Enter Your Password:
              </Typography>
              <TextField
                name="password"
                variant="outlined"
                fullWidth
                type="password"
                value={input.password}
                onChange={handleChange}
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#999' },
                    '&:hover fieldset': { borderColor: '#333' },
                    '&.Mui-focused fieldset': { borderColor: '#000' },
                  },
                }}
              />

              {error && (
                <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: '#000',
                  color: '#fff',
                  '&:hover': { bgcolor: '#333' },
                  fontWeight: 'bold',
                  py: 1.5,
                  mb: 2
                }}
              >
                Login
              </Button>

              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: '#000', textDecoration: 'none', fontWeight: 'bold' }}>
                  Create an account now
                </Link>
              </Typography>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
