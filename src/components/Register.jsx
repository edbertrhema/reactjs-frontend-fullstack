import React, { useState } from "react";
import {Link ,useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role] = useState("user");
  const [msg, setMsg] = useState("");

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

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}users`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-cetered">
            <div className="column is-4">
              <form onSubmit={saveUser} className="box">
                {/* {isError && <p className="has-text-centered">{msg}</p>} */}
                <p className="has-text-centered">{msg}</p>
                <h1 className="title is-2">Register</h1>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
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
                      placeholder="***********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Confirm Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      placeholder="***********"
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                    />
                  </div>
                </div>
                  <div className="field mt-5">
                    <button type="submit" className="button is-success is-fullwidth">
                      {/* {isLoading ? 'Loading....' : 'Login'} */}
                      Register
                    </button>
                  </div>
                  <Link to ={`/login`} className='has-text-centered'>Login</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};        

export default Register;
