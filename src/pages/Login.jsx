import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLogin } from "../hooks/useLogin";
import {Link } from "react-router-dom"
const Login = () => {
  const [loginUser, setloginUser] = useState({
    email: "",
    password: "",
  });
  const { login, error, isLoading } = useLogin();

  //Sign uP onChange function
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...loginUser };
    newFormData[name] = value;
    // setNewUser({ ...newData, [name]: value });
    setloginUser(newFormData);
  };
  //   console.log(loginUser)

  //onsubmit function
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginUser;
    await login(email, password);
    // console.log(loginUser)
  };
  const defaultImg =
    "https://generationiron.com/wp-content/uploads/2020/12/Do-You-Need-to-Train-to-Muscle-Failure-for-Hypertrophy-1-696x369.jpg";
    const animateImg="https://i.pinimg.com/originals/c1/25/8d/c1258dc0037abe9cbedb418864c92a47.gif"
    const animateImg2="https://cdn.dribbble.com/users/1981957/screenshots/3957160/hurdler_800x600.gif"
  return (
    <>

      <div id="loginPage">
      <div className="container-fluid">
      <div className="card bg-dark text-white m-5">
        <div className="row g-0">
          <div className="col-lg-6">
            <img src={animateImg2} className="card-img-top" alt="my image" style={{height:"30rem"}}/>
          </div>
          <div className="col-lg-6">
            <div className="card-body">
            <h1 className="card-title">Login Now!</h1>
              <Form onSubmit={handleLoginSubmit} className="card-text">
                <Form.Group className="my-3">
                  <Form.Label htmlFor="email"><h3>Email address :</h3></Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    name="email"
                    value={loginUser.email}
                    onChange={handleLoginChange}
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password"><h3>Enter Password :</h3></Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    value={loginUser.password}
                    onChange={handleLoginChange}
                    placeholder="Enter Password"
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ width: "100%",fontWeight:"bolder",fontSize:"2rem" }}
                  disabled={isLoading}
                >
                  Login
                </Button>
                {error && (
                  <div className="btn btn-outline-danger mt-2">{error}</div>
                )}
              </Form>
              <h1 className="card-text">Don't have account <span><Link to="/signup">SignUp Now!</Link></span></h1>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default Login;
