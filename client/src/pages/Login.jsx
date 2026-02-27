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
        values.password,
      );
      signIn(credentials.user);
      navigate("/");
    } catch (error) {
      setFieldError("general", "Invalid Credentials!");
    }

    setSubmitting(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden
  bg-gradient-to-br from-[#f3c6cf] via-[#cfd6e6] to-[#c5d4f5]"
    >
      {/* Soft Background Blobs */}
      <div className="absolute w-96 h-96 bg-[#f8d8de] rounded-full blur-3xl opacity-40 -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-[#dbe4fb] rounded-full blur-3xl opacity-40 -bottom-20 -right-20"></div>

      <div
        className="relative w-full max-w-4xl flex flex-col md:flex-row
    bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Left Illustration */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-10">
          <img src={bglogin} className="w-[62%] scale-110" alt="Login Visual" />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-10 md:p-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-600 mb-10">Please login to your account</p>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSignIn}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <div className="mb-5">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 rounded-xl bg-white/80 border border-gray-200
                  text-gray-800 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="mb-5">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-3 rounded-xl bg-white/80 border border-gray-200
                  text-gray-800 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {errors?.general && (
                  <p className="text-red-500 text-sm">{errors.general}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 mt-6 rounded-xl
                bg-gradient-to-r from-indigo-500 to-blue-500
                text-white font-semibold shadow-md
                hover:opacity-90 transition"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-sm mt-6 text-gray-600">
            Don&apos;t have an account?
            <Link
              to="/signup"
              className="text-indigo-600 font-semibold ml-1 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
