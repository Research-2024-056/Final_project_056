import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebaseAuth }  from "../../components/FirebaseContext";
import { Grid, TextField, Button, Typography } from '@mui/material';

function Register() {
  const [input, setInput] = useState({ email: "", password: "", role: "admin", firstName:"",lastName:"",mobilenumber:"" }); // Default role is user
  const { register, authError } = useFirebaseAuth();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let email = input.email.toLowerCase().trim();
      let password = input.password;
      let role = input.role; 
      let firstName = input.firstName; 
      let lastName = input.lastName; 
      let mobilenumber = input.mobilenumber; 

      // Call the register function with email, password, and role
      await register(email, password, role, firstName,lastName,mobilenumber);

      // Redirect to login page
      window.location = "/login";
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
    <Grid container spacing={2} style={{ height: '100vh' }}>
    {/* Image Section */}
    <Grid item xs={12} sm={4} style={{ height: '100%' }}>
      <img
        src="https://res.cloudinary.com/hiruniherath/image/upload/v1730135696/pexels-cottonbro-4622423_zm5mbk.jpg"
        alt="Sign Up"
        style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
      />
    </Grid>

    {/* Form Section */}
    <Grid item xs={12} sm={8} style={{ padding: '20px', height: '100%' , paddingTop:"50px" , paddingLeft:"120px"}}>
      <form autoComplete="off" className="form" onSubmit={handleSubmit} style={{width:"700px"}}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600  , }}>
          Sign Up to Seamsense !
        </Typography>
        <Typography variant="body1" sx={{ paddingTop: '10px',fontWeight: 600  }}>
          Fill the form below to create your account.
        </Typography>

        {/* Form Fields */}
        <Grid container spacing={2} sx={{ paddingTop: '20px' ,}}>
          <Grid item xs={12}>
            <Typography> Email : </Typography>
            <TextField
              name="email"
              
              placeholder="Enter email"
              type="text"
              onChange={handleChange}
              value={input.email}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
          <Typography> Password : </Typography>
            <TextField
              name="password"
             
              placeholder="Enter password"
              type="password"
              onChange={handleChange}
              value={input.password}
              required
              fullWidth
            />
          </Grid>

          

          <Grid item xs={12}>
          <Typography> First Name : </Typography>
            <TextField
              name="firstName"
       
              placeholder="Enter First Name"
              type="text"
              onChange={handleChange}
              value={input.firstName}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
          <Typography> Last Name : </Typography>
            <TextField
              name="lastName"
          
              placeholder="Enter Last Name"
              type="text"
              onChange={handleChange}
              value={input.lastName}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
          <Typography> Mobile Number : </Typography>
            <TextField
              name="mobilenumber"
              
              placeholder="Enter Mobile Number"
              type="text"
              onChange={handleChange}
              value={input.mobilenumber}
              required
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
          <Grid item xs={12}>
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
            >
              Create account
            </Button>
          </Grid>
        </Grid>

        {/* Already have an account */}
      <Typography sx={{ paddingTop: '20px', textAlign: 'center' }}>
        Already have an account?{' '}
        <Link href="/" sx={{ color: '#000', textDecoration: 'none' }}>
          Sign in
        </Link>
      </Typography>
      </form>

      
    </Grid>
  </Grid>
  );
}

export default Register;