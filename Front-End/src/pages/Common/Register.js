import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebaseAuth } from "../../components/FirebaseContext";
import { Grid, TextField, Button, Typography, useMediaQuery, useTheme } from "@mui/material";

function Register() {
  const [input, setInput] = useState({
    email: "", password: "", role: "admin", firstName: "", lastName: "", mobilenumber: ""
  });
  const { register, authError } = useFirebaseAuth();
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password, role, firstName, lastName, mobilenumber } = input;
      await register(email.toLowerCase().trim(), password, role, firstName, lastName, mobilenumber);
      window.location = "/login";  // Redirect to login page
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
    <Grid container style={{ height: "100vh", overflow: "hidden" }}>
      {/* Image Section */}
      
        <Grid item md={4}  xs={12} style={{ display: isSmallScreen ? "block" : "block" , height:  isSmallScreen ? "20px" : "20px"}}>
          <img
            src="https://res.cloudinary.com/hiruniherath/image/upload/v1730135696/pexels-cottonbro-4622423_zm5mbk.jpg"
            alt="Sign Up"
            style={{ width: "100%",height:  isSmallScreen ? "80px" : "100vh", objectFit: "cover"  }}
          />
        </Grid>
     

      {/* Form Section */}
      <Grid
        item xs={12} md={8}
        style={{
          padding: isSmallScreen ? "20px" : "50px",
          
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Sign Up to Seamsense!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, fontWeight: 600 }}>
            Fill the form below to create your account.
          </Typography>

          {/* Form Fields */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Email:</Typography>
              <TextField
                name="email"
                placeholder="Enter email"
                type="email"
                value={input.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>Password:</Typography>
              <TextField
                name="password"
                placeholder="Enter password"
                type="password"
                value={input.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>First Name:</Typography>
              <TextField
                name="firstName"
                placeholder="Enter First Name"
                type="text"
                value={input.firstName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>Last Name:</Typography>
              <TextField
                name="lastName"
                placeholder="Enter Last Name"
                type="text"
                value={input.lastName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>Mobile Number:</Typography>
              <TextField
                name="mobilenumber"
                placeholder="Enter Mobile Number"
                type="text"
                value={input.mobilenumber}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            {/* Error Message */}
            {error && (
              <Grid item xs={12}>
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              </Grid>
            )}

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                Create account
              </Button>
            </Grid>
          </Grid>

          {/* Already have an account */}
          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#000", textDecoration: "none" }}>
              Sign in
            </Link>
          </Typography>
        </form>
      </Grid>
    </Grid>
  );
}

export default Register;
