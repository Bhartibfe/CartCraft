import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import bglogin from "../assets/bg-img.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  // Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSignIn = async (values, { setSubmitting, setFieldError }) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      signIn(credentials.user);
      navigate("/");
    } catch (error) {
      setFieldError("general", "Invalid Credentials!");
    }

    setSubmitting(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-start h-screen bg-[#0a2027]">
      <div className="w-full h-[28vh] px-10 pt-10 md:w-1/2 md:h-full md:py-10">
        <img
          src={bglogin}
          className="w-[80%] h-full mx-auto rounded-lg md:w-full md:h-full"
        />
      </div>
      <div className="w-full flex flex-col p-10 md:w-1/2 md:h-full md:py-20 md:px-24">
        <h2 className="font-semibold mb-4 text-[30px] text-center text-zinc-300 md:text-[40px] md:text-start">
          Welcome Back
        </h2>
        <p className="text-xs mb-10 text-zinc-300 text-center md:text-start md:text-sm">
          Please login to your account
        </p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
        >
          {({ isSubmitting, errors }) => (
            <Form className="w-full">
              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  className="w-full p-3 pl-5 text-sm text-zinc-200 rounded bg-[#13313a] outline-none"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-400 text-xs"
                />
              </div>

              <div className="mb-4">
                <Field
                  type="password"
                  name="password"
                  className="w-full p-3 pl-5 text-sm text-zinc-200 rounded bg-[#13313a] outline-none"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-400 text-xs"
                />
              </div>

              {errors?.general && (
                <p className="text-red-400 text-xs">{errors?.general}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#196a78] text-white w-full py-3 my-6 rounded hover:bg-[#17606d] hover:-translate-y-1 duration-200"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-xs text-zinc-300 text-center md:text-start">
          Don&apos;t have an account?
          <Link to="/signup">
            <span className="text-[#2796aa] hover:underline"> Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
