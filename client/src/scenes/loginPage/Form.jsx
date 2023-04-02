import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormLabel,
  Typography,
  useTheme,
} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import Modal from "./PopupRegister";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required").min(8, 'Enter a valid range between 8-16!').max(16, 'Enter a valid range between 8-16!'), //edit here for the validation
  location: yup.string().required("required"),
  age: yup.number().required("required").min(13, 'Must be 13 and above').max(100, 'Are you sure?'),
  gender: yup.string().required("required"),
  height: yup.number().required("required").min(50, 'Enter a valid range between 50-300 cm').max(300, 'Enter a valid range between 50-300 cm'),
  weight: yup.number().required("required").min(30, 'Enter a valid range between 30-500 kg').max(500, 'Enter a valid range between 30-500 kg'),
  fitnessPlan: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required").min(8, 'Enter a valid range between 8-16!').max(16, 'Enter a valid range between 8-16!')
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  picture: "",
  age: "", 
  height: "", 
  weight: "", 
  fitnessPlan: ""
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [show, setShow] = useState(false);

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);


    try{
      const savedUserResponse = await fetch(
        "http://localhost:3001/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );
      if(savedUserResponse.status === 500){
        setShow(true);
        console.log(savedUserResponse);
        onSubmitProps.resetForm();
      }
      else{
        console.log(savedUserResponse)
        const savedUser = await savedUserResponse.json();
        if (savedUser) {
          console.log(savedUser)
          onSubmitProps.resetForm();
          setPageType("login");
        }
      }
    } catch(error){
      console.log(error);
      onSubmitProps.resetForm();
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (loggedInResponse.status == 400){
      alert("Invalid login")
    }
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }

  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <>

    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Height"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.height}
                  name="height"
                  type="number"
                  error={
                    Boolean(touched.height) && Boolean(errors.height)
                  }
                  helperText={touched.height && errors.height}
                  sx={{ gridColumn: "span 2" }}
                  InputProps={{
                    inputProps: { 
                        min: 50, 
                        max: 300
                    }
                  }}
                />
                <TextField
                  label="Weight"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.weight}
                  name="weight"
                  type="number"
                  error={Boolean(touched.weight) && Boolean(errors.weight)}
                  helperText={touched.weight && errors.weight}
                  sx={{ gridColumn: "span 2" }}
                  InputProps={{
                    inputProps: { 
                        min: 30, 
                        max: 500
                    }
                  }}
                />
                <TextField
                  label="Age"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.age}
                  name="age"
                  type="number"
                  error={Boolean(touched.age) && Boolean(errors.age)}
                  helperText={touched.age && errors.age}
                  sx={{ gridColumn: "span 4" }}
                  InputProps={{
                    inputProps: { 
                        type: 'number',
                        min: 13, 
                        max: 100
                    }
                  }}
                />
                <FormLabel sx={{paddingBottom: 0}}>
                  Gender
                </FormLabel>
            <FormControl required sx={{ gridColumn: "span 4" }}
            error={Boolean(touched.gender) && Boolean(errors.gender)} helperText={touched.gender && errors.gender}        
                  >
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    name="gender"
                    value={values.gender}
                    margin='normal'
                    required
                    onChange={handleChange}
                    error={Boolean(touched.gender) && Boolean(errors.gender)}
                    helperText={touched.gender && errors.gender}
                    
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={'Female'}>Female</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                <FormLabel sx={{paddingBottom: 0}}>
                  Fitness Plan
                </FormLabel>
                <FormControl required sx={{ gridColumn: "span 4" }}
            error={Boolean(touched.fitnessPlan) && Boolean(errors.fitnessPlan)} helperText={touched.fitnessPlan && errors.fitnessPlan}        
                  >
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    name="fitnessPlan"
                    value={values.fitnessPlan}
                    margin='normal'
                    required
                    onChange={handleChange}
                    error={Boolean(touched.fitnessPlan) && Boolean(errors.fitnessPlan)}
                    helperText={touched.fitnessPlan && errors.fitnessPlan}
                  >
                    <MenuItem value={"LowFat"}>LowFat</MenuItem>
                    <MenuItem value={'Muscle'}>Muscle</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />

          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}

    </Formik>
    <Modal 
        onClose={() => setShow(false)} 
        show={show} 
        name="Food"
    />
    </>
  );
};

export default Form;
