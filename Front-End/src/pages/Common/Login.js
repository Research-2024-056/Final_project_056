import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebaseAuth } from "../../components/FirebaseContext";
import { Grid, TextField, Button, Typography } from '@mui/material';


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
      window.location="/dashboard"
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
    <div>

<Grid container spacing={2} >
  <Grid item xs={12} sm={4} style={{ height: '100%' }}>
    <div style={{ height: '100%' }}>
      <img 
        src="https://res.cloudinary.com/hiruniherath/image/upload/v1730135704/pexels-michael-burrows-7147460_limwym.jpg" 
        alt="login" 
        style={{ width: '100%', height: '100vh', objectFit: 'cover' }} 
      />
    </div>
  </Grid>
  <Grid item xs={12} sm={8} style={{ height: '100%' }}>
    <div style={{ padding: '20px', height: '100%' , paddingLeft:"90px" , paddingTop:"100px"}}>
    <div className="form-body">
  <form autoComplete="off" className="form" onSubmit={handleSubmit}>
    <Typography variant="h4" component="h1" sx={{paddingTop:"50px" , fontWeight:"800"}}>
      Welcome to Seamsense,
    </Typography>
    <Typography variant="h6" component="h2"  sx={{paddingTop:"10px" , fontWeight:"800"}}>
      Sign In to Continue
    </Typography>
    
    <Typography variant="body2"  sx={{paddingTop:"20px" , fontWeight:"800"}}>
      Don't have an account?{' '}
      <Link href="/signup" sx={{ color: '#000000', textDecoration: 'none' ,fontWeight:"800"}}>
        Create an account now
      </Link>
    </Typography>

    <Grid container spacing={2} sx={{paddingTop : "70px" , width:"700px"}}>
    <Typography variant="body2"  sx={{paddingTop:"20px" , fontWeight:"800" , paddingLeft:"20px"}}>Enter Your Email : </Typography>
      
      {/* Email Input */}
      <Grid item xs={12}>
        <TextField
          name="email"
         
          variant="outlined"
          fullWidth
          type="email"
          value={input.email}
          onChange={handleChange}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'black', // Default border color
              },
              '&:hover fieldset': {
                borderColor: 'black', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black', // Border color when focused
              },
              '&.Mui-focused': {
                backgroundColor: 'white', // Background color when focused
              },
            },}}
          
        />
      </Grid>

      {/* Password Input */}
      <Typography variant="body2"  sx={{paddingTop:"20px" , fontWeight:"800" , paddingLeft:"20px"}}>Enter Your Password : </Typography>
      <Grid item xs={12}>
        <TextField
          name="password"
          
          variant="outlined"
          fullWidth
          type="password"
          value={input.password}
          onChange={handleChange}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'black', // Default border color
              },
              '&:hover fieldset': {
                borderColor: 'black', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black', // Border color when focused
              },
              '&.Mui-focused': {
                backgroundColor: 'white', // Background color when focused
              },
            },}}
        />
      </Grid>

      {/* Login Button */}
      <Grid item xs={12}>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        < Button type="submit" variant="contained" sx={{
    color: "#ffffff",
    backgroundColor: "#000000",
    '&:hover': {
      backgroundColor: "#333333",  // Lighter shade on hover
    },
  }}
  fullWidth >
          Login
        </Button>
      </Grid>
    </Grid>
  </form>
</div>
      
    
    </div>
  </Grid>
</Grid>

    
    </div>
  );
}

export default Login;