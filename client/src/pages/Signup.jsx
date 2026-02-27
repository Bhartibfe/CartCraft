import { useNavigate, Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import bglogin from "../assets/bg-img.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";

const Signup = () => {
  // const handleSignUp = (values) => {
  //   console.log("first");
  //   const storedSignupData = JSON.parse(localStorage.getItem("signupData"));
  //   if (storedSignupData?.email === values?.email) {
  //     console.log("This Email is already being used");
  //   } else {
  //     localStorage.setItem("signupData", JSON.stringify(values));
  //     navigate("/login");
  //   }
  // };
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Minimum 2 characters").required("Required"),
    lastName: Yup.string().min(2, "Minimum 2 characters").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .max(16, "Must be less than 16 characters")
      .matches(/[A-Z]/, "Must have at least one uppercase letter")
      .matches(/[a-z]/, "Must have at least one lowercase letter")
      .matches(/\d/, "Must have at least one number")
      .matches(/[@$!%*?&]/, "Must have at least one special character")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    checkbox: Yup.boolean().oneOf(
      [true],
      "Please accept the terms and conditions",
    ),
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden
  bg-gradient-to-br from-[#f3c6cf] via-[#cfd6e6] to-[#c5d4f5]"
    >
      {/* Soft Background Blobs */}
      <div className="absolute w-96 h-96 bg-[#f8d8de] rounded-full blur-3xl opacity-40 -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-[#dbe4fb] rounded-full blur-3xl opacity-40 -bottom-20 -right-20"></div>

      <div
        className="relative w-full max-w-5xl flex flex-col md:flex-row
    bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Left Illustration */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-10">
          <img
            src={bglogin}
            className="w-[60%] scale-110"
            alt="Signup Visual"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-10 md:p-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Create an account
          </h2>

          <p className="text-gray-600 mb-8">
            Already have an account?
            <Link
              to="/login"
              className="text-indigo-600 font-semibold ml-1 hover:underline"
            >
              Login
            </Link>
          </p>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              checkbox: false,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setFieldError, setSubmitting }) => {
              try {
                const userCredential = await createUserWithEmailAndPassword(
                  auth,
                  values.email,
                  values.password,
                );

                await updateProfile(userCredential.user, {
                  displayName: `${values.firstName} ${values.lastName}`,
                });

                navigate("/login");
              } catch (error) {
                if (error?.code === "auth/email-already-in-use") {
                  setFieldError("email", "This email is already being used");
                } else {
                  setFieldError("email", "Failed to create account");
                }
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="w-full" onSubmit={handleSubmit}>
                {/* First & Last Name */}
                <div className="mb-5 flex flex-col md:flex-row gap-4">
                  <div className="w-full">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      className="w-full p-3 rounded-xl bg-white/80 border border-gray-200
                    text-gray-800 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                    />
                    {errors.firstName && touched.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="w-full">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      className="w-full p-3 rounded-xl bg-white/80 border border-gray-200
                    text-gray-800 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                    />
                    {errors.lastName && touched.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-5">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="w-full p-3 rounded-xl bg-white/80 border border-gray-200
                  text-gray-800 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="mb-5">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="w-full p-3 rounded-xl bg-white/80 border border-gray-200
                  text-gray-800 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-5">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    className="w-full p-3 rounded-xl bg-white/80 border border-gray-200
                  text-gray-800 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Checkbox */}
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="checkbox"
                      onChange={handleChange}
                      checked={values.checkbox}
                      className="accent-indigo-500"
                    />
                    <label className="text-sm text-gray-600">
                      I agree to the{" "}
                      <span className="text-indigo-600 font-medium underline cursor-pointer">
                        Terms & Conditions
                      </span>
                    </label>
                  </div>
                  {errors.checkbox && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.checkbox}
                    </p>
                  )}
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 mt-4 rounded-xl
                bg-gradient-to-r from-indigo-500 to-blue-500
                text-white font-semibold shadow-md
                hover:opacity-90 transition"
                >
                  {isSubmitting ? "Creating account..." : "Sign Up"}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
