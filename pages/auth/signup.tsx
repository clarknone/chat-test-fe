import LoadingButton from "@/component/general/loadingButton";
import CustomSnackBar from "@/component/general/snackbar";
import { useAuthContex } from "@/context/auth";
import { ISignUpData } from "@/interface/auth";
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";


export default function AuthPage() {
  const router = useRouter();
  const { signUp } = useAuthContex();
  const [snackbar, setSnackbar] = useState<{ error?: string; success?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: ISignUpData = {
      email: e.currentTarget["email"].value,
      password: e.currentTarget["password"].value,
      fullname: e.currentTarget["fullname"].value,
    };
    setSnackbar({});
    setLoading(true);
    signUp &&
      signUp(data)
        .then(() => {
          setSnackbar(() => ({ success: "Login sucessful" }));
          router.push("/");
        })
        .catch((e) => {
          setSnackbar(() => ({ error: e.message }));
        })
        .finally(() => {
          setLoading(false);
        });
  };
  return (
    <Stack justifyContent={"center"} alignItems="center" sx={{ minHeight: "100vh" }}>
      <Card elevation={0}>
        <CardContent>
          <Typography>
            Create an account or{" "}
            <Link href={"/auth/login"}>
              <Button> Sign In </Button>
            </Link>
          </Typography>
          <form onSubmit={handleSignup}>
            <Stack gap={"2em"}>
              <TextField label="Full Name" name="fullname" required />
              <TextField label="Email" name="email" type={"email"} required />
              <TextField label="Password" name="password" type={"password"} required />
              <Box>
                <LoadingButton loading={loading} type="submit">
                  SignUp
                </LoadingButton>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>

      <CustomSnackBar
        display={Boolean(snackbar.error || snackbar.success)}
        type={snackbar.success ? "success" : "error"}
        message={snackbar.error || snackbar.success}
      />
    </Stack>
  );
}