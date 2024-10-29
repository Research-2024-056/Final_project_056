import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebaseAuth } from "../../components/FirebaseContext";
import { Grid, TextField, Button, Typography, useMediaQuery, useTheme } from "@mui/material";

function Login() {
  const [input, setInput] = useState({ email: "", password: "" });
  const { login, authError } = useFirebaseAuth();
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Grid container>
        {/* Left Image Section */}
        <Grid item xs={12} md={4} style={{ display: isSmallScreen ? "block" : "block" , height:  isSmallScreen ? "20px" : "20px"}}>
          <img
            src="https://res.cloudinary.com/hiruniherath/image/upload/v1730135704/pexels-michael-burrows-7147460_limwym.jpg"
            alt="login"
            style={{ width: "100%",  height:  isSmallScreen ? "80px" : "100vh", objectFit: "cover" }}
          />
        </Grid>

        {/* Login Form Section */}
        <Grid item xs={12} md={8} style={{ padding: isSmallScreen ? "50px" : "60px" , marginTop:isSmallScreen ? "50px" : "60px" }}>
          <div
            style={{
              maxWidth: "500px",
              margin: "0 auto",
              padding: isSmallScreen ? "10px" : "50px",
            }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: "800", mb: 2 }}>
              Welcome to Seamsense,
            </Typography>
            <Typography variant="h6" component="h2" sx={{ fontWeight: "800", mb: 2 }}>
              Sign In to Continue
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, fontWeight: "800" }}>
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{ color: "#000000", textDecoration: "none", fontWeight: "800" }}
              >
                Create an account now
              </Link>
            </Typography>

            <form autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Email Input */}
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ fontWeight: "800", mb: 1 }}>
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
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "black" },
                        "&:hover fieldset": { borderColor: "black" },
                        "&.Mui-focused fieldset": { borderColor: "black" },
                        "&.Mui-focused": { backgroundColor: "white" },
                      },
                    }}
                  />
                </Grid>

                {/* Password Input */}
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ fontWeight: "800", mb: 1 }}>
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
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "black" },
                        "&:hover fieldset": { borderColor: "black" },
                        "&.Mui-focused fieldset": { borderColor: "black" },
                        "&.Mui-focused": { backgroundColor: "white" },
                      },
                    }}
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

                {/* Login Button */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#333333",
                      },
                    }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
