import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar, SnackbarProvider } from "notistack";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory } from "react-router-dom";

    
const Landing = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    username: '',
    password: '', 
    confirmPassword:''
  })

  const [loading, setLoading] = useState(false);

    const history = useHistory();


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  
  const register = async () => {
    const url = config.endpoint + "/auth/register";

 
    if (validateInput(formData)) {
     
      setLoading(true);
      try {
        await axios.post(url, {
          username: formData.username,
          password: formData.password
        })
        setFormData({
           username: '',
            password: '', 
            confirmPassword:''
        })
        enqueueSnackbar('Registered successfully', { autoHideDuration: 3000, variant: 'success' })
        history.push("/login", { from: "RegisterPage" })

      } catch (error) {
        
        if (error.response && error.response.status === 400)
        {
          enqueueSnackbar(error.response.data.message, { autoHideDuration: 3000, variant: 'error' });
        }
        else {
          enqueueSnackbar("backend is not started", { autoHideDuration: 3000 }, {variant: 'error'})
        }
      }
      finally {
        setLoading(false);
      }

    }

  };

  const handleInputChange = (event) => {
    const { value,name } = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData, 
        [name]:value
      }
    })
  }



  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    // console.log("Form data called")
    // console.log(data);

    if (!data.username) {
      enqueueSnackbar("Username is a required field", { autoHideDuration: 3000, variant: 'error' });
      return false;
    }

    else if (!data.password) {
      enqueueSnackbar("Password is a required field", { autoHideDuration: 3000 , variant: 'error'});
      return false;
    }
    
     if (data.username.length < 6)
    {
      enqueueSnackbar("Username should be atleast 6 characters", { autoHideDuration: 3000, variant: 'error'});
      return false;
     }
    
     if (data.password.length < 6)
    {
      enqueueSnackbar("Password should be atleast 6 characters", { autoHideDuration: 3000,variant: 'error' });
      return false;
    }
  

    else if (data.password.length !== data.confirmPassword.length)
    {
      enqueueSnackbar("Passwords do not match", { autoHideDuration: 3000, variant: 'error' });
      return false;
    }
    
    return true;
  };

  // console.log(formData)

  return (
   
     <SnackbarProvider>
      <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={handleInputChange}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={handleInputChange}
            />
            {
              loading &&
              (<Box  display="flex" justifyContent="center" id="loadingBox" fullWidth>
                <CircularProgress />
              </Box>)
            }
            
           <Button className="button" id="registerButton" variant="contained" onClick = {register}>
            Register Now
           </Button>
          <p className="secondary-action">
            Already have an account?{" "} 
             {/* <a className="link" href="#">
              Login here
             </a> */} 
              <Link to="/login">
                Login here
              </Link>
          </p>
        </Stack>
      </Box>
      {/* <button onClick={() => enqueueSnackbar('That was easy!')}>Show snackbar</button> */}
      <Footer />
    </Box>
 </SnackbarProvider>
    
  );
};

export default Landing;
