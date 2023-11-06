import React, { useState } from "react";
import {Link ,useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg,setMsg] = useState("")
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user, isError, isSuccess, isLoading, message } = useSelector(
  //   (state) => state.auth
  // );

  // useEffect(() => {
  //   if (user || isSuccess) {
  //     navigate("/dashboard");
  //   }
  //   dispatch(reset());
  // }, [user, isSuccess, dispatch, navigate]);

  const Auth = async(e) => {
    e.preventDefault();
    // dispatch(LoginUser({ email, password }));

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}login`,{
        email:email,
        password:password
      })
      localStorage.setItem('myToken',response.data.accessToken)
      navigate("/dashboard")
    } catch (error) {
      if(error.response){
        // try {
          setMsg(error.response.data.msg)          
        // } catch (error) {
        //   setMsg("Network Error")          
        // }
      }else{
          setMsg("Server Error")          
        navigate("/")

      }
    }    
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-cetered">
            <div className="column is-4">
              <form onSubmit={Auth} className="box">
                {/* {isError && <p className="has-text-centered">{msg}</p>} */}
                <p className="has-text-centered">{msg}</p>
                <h1 className="title is-2">Sign in</h1>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      placeholder="*********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="field mt-5">
                    <button type="submit" className="button is-success is-fullwidth">
                      {/* {isLoading ? 'Loading....' : 'Login'} */}
                      Login
                    </button>
                  </div>
                </div>
                  <Link to ={`/register`} className='has-text-centered'>Register</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};        

export default Login;
