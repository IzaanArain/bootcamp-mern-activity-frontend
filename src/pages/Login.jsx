
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [loginUser, setloginUser] = useState({
        email:"",
        password:""
      });
      const {login,error,isLoading}=useLogin()

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
    const handleLoginSubmit=async(e)=>{
        e.preventDefault()
        const {email,password}=loginUser
        await login(email,password)
        // console.log(loginUser)
    }
      
  return (
    <>
    <div className="container" style={{ width: "50%" }}>
        <h1 className="text-center mt-4">PleaseLogin</h1>
        <hr />
        <div className="card p-4">
            <h1 className="card-title">Form</h1>
          <Form onSubmit={handleLoginSubmit}> 

            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email address</Form.Label>
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
              <Form.Label htmlFor="password">Enter Password</Form.Label>
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
            style={{ width: "100%" }}
            disabled={isLoading}>
              Login
            </Button>
            {error && <div className="btn btn-outline-danger mt-2">{error}</div>}
          </Form>
          </div>
      </div>
    </>
  )
}

export default Login