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
import { useLogin } from "../hooks/useLogin";
import { Formik } from "formik";
import { RegisterFormType } from "./RegisterForm";
import * as yup from "yup";

export type LoginFormType = Pick<RegisterFormType, "email" | "password">;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { login, isPending } = useLogin();

  const loginSchema = yup.object().shape({
    email: yup.string().email().required("required"),
    password: yup.string().required("required"),
  });

  const initialValuesLogin: LoginFormType = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: LoginFormType) => {
    login(values);
  };

  return (
    <div>
      <Box className="flex items-center justify-center py-8">
        <Formik
          initialValues={initialValuesLogin}
          validationSchema={loginSchema}
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
              className="grid gap-6 rounded-md border-2 border-solid border-cyan-secondary bg-amber-secondary px-10 py-5 shadow-md"
            >
              <h1 className="text-center text-xl font-bold">
                Login to enjoy reading :)
              </h1>

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

              <div className="flex justify-center">
                <button
                  className="btn-primary max-w-32"
                  type="submit"
                  disabled={isPending}
                >
                  Login
                </button>
              </div>
            </form>
          )}
        </Formik>
      </Box>
      <h1 className="text-center">
        Don't have an account?{" "}
        <Link to="/register" className="font-bold text-orange-primary underline">
          Register Now
        </Link>
      </h1>
    </div>
  );
};

export default LoginForm;
