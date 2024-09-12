import { useState } from "react";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Dropzone from "./Dropzone";
import { Formik } from "formik";
import * as yup from "yup";
import { useRegister } from "../hooks/useRegister";

export interface RegisterFormType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  picture: File | null;
}
const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, isPending } = useRegister();

  const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email().required("required"),
    password: yup.string().required("required"),
    phone: yup.string().required("required"),
  });

  const initialValuesRegister: RegisterFormType = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    picture: null,
  };

  const handleSubmit = (values: RegisterFormType) => {
    register(values);
  };

  return (
    <div>
      <Box className="flex items-center justify-center py-8">
        <Formik
          initialValues={initialValuesRegister}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="grid gap-6 py-5 px-10 border-2 border-solid border-cyan-secondary rounded-md shadow-md bg-amber-secondary"
            >
              <h1 className="text-xl font-bold text-center">
                Register to enjoy reading :)
              </h1>
              <div className="flex gap-4">
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  color="info"
                  type="firstName"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />

                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  color="info"
                  type="lastName"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
              </div>

              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                color="info"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />

              <FormControl
                color="info"
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldValue("password", e.target.value)
                }
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        onMouseDown={(e) => e.preventDefault()}
                        onMouseUp={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                color="info"
                type="phone"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />

              <Dropzone values={values} setFieldValue={setFieldValue} />
              <div className="flex justify-center">
                <button
                  className="btn max-w-32"
                  type="submit"
                  disabled={isPending}
                >
                  Register
                </button>
              </div>
            </form>
          )}
        </Formik>
      </Box>
      <h1 className="text-center">
        Already have an account?{" "}
        <Link to="/login" className="font-bold underline text-orange">
          Login
        </Link>
      </h1>
    </div>
  );
};

export default RegisterForm;
