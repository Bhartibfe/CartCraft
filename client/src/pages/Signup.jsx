import { useNavigate, Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import bglogin from "../assets/bg-img.png";

const Signup = () => {
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
      "Please accept the terms and conditions"
    ),
  });

  return (
    <div className="flex flex-col items-start h-screen bg-[#0a2027] overflow-hidden md:flex-row">
      <div className="w-full h-[20vh] px-10 pt-10 md:w-1/2 md:h-full md:py-10">
        <img
          src={bglogin}
          className="w-[50%] h-full mx-auto rounded-lg md:w-full md:h-full"
        />
      </div>
      <div className="w-full flex flex-col p-10 pt-5 md:h-full md:w-1/2 md:py-20 md:px-24">
        <h2 className="font-semibold mb-2 text-[25px] text-center text-zinc-300 md:mb-4 md:text-[40px] md:text-start ">
          Create an account
        </h2>
        <p className="text-xs mb-5 text-zinc-300 text-center md:text-start md:mb-10 md:text-sm">
          Already have an account?
          <Link to="/login">
            <span className="text-[#2796aa] hover:underline"> Login</span>
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
          onSubmit={(values) => {
            localStorage.setItem("signupData", JSON.stringify(values));
            navigate("/login");
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
              <div className="mb-4 flex flex-col justify-between w-full gap-4 md:flex-row">
                <div className="w-full md:w-1/2">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="w-full p-3 pl-5 text-sm text-zinc-200 rounded bg-[#13313a] outline-none"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="text-red-400 text-xs">{errors.firstName}</p>
                  )}
                </div>
                <div className="w-full md:w-1/2">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full p-3 pl-5 text-sm text-zinc-200 rounded bg-[#13313a] outline-none"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="text-red-400 text-xs">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 pl-5 text-sm text-zinc-200 rounded bg-[#13313a] outline-none"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <p className="text-red-400 text-xs">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-3 pl-5 text-sm text-zinc-200 rounded bg-[#13313a] outline-none"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <p className="text-red-400 text-xs">{errors.password}</p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="w-full p-3 pl-5 text-sm text-zinc-200 rounded bg-[#13313a] outline-none"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-400 text-xs">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <div className="pb-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="checkbox"
                    onChange={handleChange}
                    checked={values.checkbox}
                  />
                  <label
                    htmlFor="checkbox"
                    className="text-xs text-zinc-300 ml-2"
                  >
                    {" "}
                    I agree to the{" "}
                    <span className="text-[#2796aa] ml-2 underline cursor-pointer">
                      Terms & Conditions
                    </span>
                  </label>
                </div>
                {errors.checkbox && (
                  <p className="text-red-400 text-xs">{errors.checkbox}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-[#196a78] text-white w-full py-3 my-3 rounded md:my-6 hover:bg-[#17606d] hover:-translate-y-1 duration-200"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
