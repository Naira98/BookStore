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
} from "@mui/material";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <div>
      <Box className="flex items-center justify-center py-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-6 py-10 px-6 border-2 border-solid border-cyan-secondary rounded-md shadow-md bg-amber-secondary"
        >
          <h1 className="font-bold">Login to enjoy reading :)</h1>

          <FormControl
            color="info"
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          >
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput id="outlined-adornment-email" label="Email" />
          </FormControl>

          <FormControl
            color="info"
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
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
          <button className="btn" type="submit" disabled={isPending}>
            Login
          </button>
        </form>
      </Box>
      <h1 className="text-center">
        Don't have an account?{" "}
        <Link to="/register" className="font-bold underline text-orange">
          Register Now
        </Link>
      </h1>
    </div>
  );
};

export default LoginForm;
