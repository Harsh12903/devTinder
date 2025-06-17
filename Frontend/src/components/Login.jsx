import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import  baseUrl  from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName,setFirstName]=useState("");
  const [lastName,setlastName]=useState("");
  const [isloginForm,setIsoginForm]=useState(true);
  const [error,setError]=useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        baseUrl + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data);
      
    }
  };
  const handleSignup=async()=>{
    try {
      const res=await axios.post(baseUrl+'/signup',{firstName,lastName,email,password},{withCredentials:true});
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
            setError(err?.response?.data);

    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">{isloginForm?"Login":"Sign Up"}</h2>
          <div>
            {
              !isloginForm && <>
              <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setlastName(e.target.value)}
              />
            </label>
              </>
            }
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="text"
                value={email}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="flex card-actions items-center justify-center m-2">
            <p className="text-red-400">{error}</p>
            <p onClick={()=>setIsoginForm(value=>!value)} className="hover:cursor-pointer hover:scale-110 transition duration-200 ease-linear">{isloginForm?'New User? Create an account':'Already have an account'}</p>
            <button className="btn btn-primary" onClick={isloginForm?handleLogin:handleSignup}>
              {isloginForm?"Login":"SignUp"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;