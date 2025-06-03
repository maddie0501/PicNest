import { useState } from "react";
import { useSnackbar } from "notistack";
import Logo from "../assets/Logoicon.png";
import Bkgimg from "../assets/background.jpg";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    birthdate: "",
  });

  const handleLogin = () => {
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/signup");
  };
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
    //   console.log(signup, formData)
  };

  const signup = async (formData) => {
    //   console.log(formData)
    if (validateInput(formData)) {
      setloading(true);

      try {
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = existingUsers.find(
          (user) => user.username === formData.username
        );

        if (userExists) {
          enqueueSnackbar("Email already exists", { variant: "error" });
          setloading(false);
          return;
        }

        const updatedUsers = [
          ...existingUsers,
          {
            username: formData.username,
            password: formData.password,
          },
        ];

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        //   console.log(updatedUsers,'exe', existingUsers)

        enqueueSnackbar("Registered successfully", { variant: "success" });
        setloading(false);
        navigate("/signup");
      } catch (error) {
        if (error.response)
          enqueueSnackbar("An unexpected error occurred", { variant: "error" });
        setloading(false);
      }
    }
  };

  const validateInput = (data) => {
    //   console.log('data',data)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.username) {
      enqueueSnackbar("Email is a required field", { variant: "warning" });
      return false;
    } else if (!emailRegex.test(data.username)) {
      enqueueSnackbar("Invalid email format", { variant: "warning" });
      return false;
    } else if (!data.password) {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    } else if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      <nav className="hidden lg:flex flex-row  ">
        <div className="flex flex-row p-5 justify-start  mt-2">
          <img src={Logo} alt="logo" className="w-8 h-8" />
          <h2 className="font-bold text-red-700  text-lg w-full">PicNest</h2>
          <h2 className="text-lg font-bold pl-5">Explore</h2>
        </div>
        <div className="flex justify-end p-5 w-full gap-6 items-center mt-2">
          <a href="">About</a>
          <a href="">Businesses</a>
          <a href="">Create</a>
          <a href="">News</a>
          <button
            className="bg-red-700 p-3 rounded-xl text-white cursor-pointer"
            onClick={handleLogin}
            type="button"
          >
            Log in
          </button>
          <button
            className="bg-gray-300 p-3 rounded-xl text-black cursor-pointer"
            onClick={handleSignup}
            type="button"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <div className="flex justify-between relative">
        <div className="relative w-full h-screen">
          <img
            src={Bkgimg}
            alt="img"
            className="w-screen h-screen object-cover  "
          />
          <div className="absolute inset-0 bg-black/40"></div>

          <h1 className=" hidden lg:block text-6xl absolute top-50 left-70 text-white font-bold ">
            Log in to get
            <br />
            your Ideas
          </h1>
        </div>

        <div className="box-content rounded-xl bg-white right-30 absolute top-0 w-100 h-100 gap-5 pt-5 pb-20  ">
          <img src={Logo} alt="Logo" className="mx-auto" />
          <h1 className="text-3xl text-center">Welcome to PicNest</h1>
          <p className="text-center"> Find new ideas to try</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-center">
              <p className="pr-35">Email</p>

              <input
                type="text"
                name="username"
                placeholder="Email"
                className=" rounded-xl border border-gray-400 bg-gray-100 p-2 mt-1"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3 text-center">
              <p className="pr-30">Password</p>

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="rounded-xl border border-gray-400 bg-gray-100 p-2 mt-1"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3 text-center">
              <p className="pr-30">Birthdate</p>

              <input
                type="date"
                name="birthdate"
                className="rounded-xl border border-gray-400 bg-gray-100 p-2 mt-1 w-50"
                value={formData.birthdate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-center p-2">
              <button
                onClick={() => signup(formData)}
                className="bg-red-700  pl-10 pr-10 py-1 rounded-xl text-white flex  cursor-pointer"
                type="button"
              >
                {loading}
                Continue
              </button>
            </div>
          </form>

          <div className="flex flex-col items-center justify-center p-2">
            <a href="">Not on PicNest yet? Sign up</a>
            <p>
              Already a member?{" "}
              <Link to="/" href="/">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
