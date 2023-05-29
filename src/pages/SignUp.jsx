
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSignUp } from "../hooks/useSignUp";
const SignUp = () => {
    const [newUser, setNewUser] = useState({
        fname:"",
        lname:"",
        email:"",
        password:""
      });
      const{signup,isLoading,error}=useSignUp()

      //Sign uP onChange function
      const handleSignUpChange = (e) => {
        const { name, value } = e.target;
        let newFormData = { ...newUser };
        newFormData[name] = value;
        // setNewUser({ ...newData, [name]: value });
        setNewUser(newFormData);
      };
    //   console.log(newUser)

    //onsubmit function
    const handleSignUpSubmit=async(e)=>{
        e.preventDefault()
        // console.log(newUser)
        const {fname,lname,email,password}=newUser
        await signup(fname,lname,email,password)
    }
      
  return (
    <>
    <div className="container" style={{ width: "50%" }}>
        <h1 className="text-center mt-4">Please register your self</h1>
        <hr />
        <div className="card p-4">
            <h1 className="card-title">Form</h1>
          <Form onSubmit={handleSignUpSubmit}>

          <Form.Group className="mb-3">
              <Form.Label htmlFor="fname">First Name :</Form.Label>
              <Form.Control
                type="text"
                id="fname"
                name="fname"
                value={newUser.fname}
                onChange={handleSignUpChange}
                placeholder="Enter your first name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="lname">Last Name :</Form.Label>
              <Form.Control
                type="text"
                id="lname"
                name="lname"
                value={newUser.lname}
                onChange={handleSignUpChange}
                placeholder="Enter your last name"
                required
              />
            </Form.Group>
            

            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleSignUpChange}
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
                value={newUser.password}
                onChange={handleSignUpChange}
                placeholder="Enter Password"
                required
              />
            </Form.Group>
            <Button variant="primary" 
            type="submit" 
            style={{ width: "100%" }}
            disabled={isLoading}>
              Submit
            </Button>
            {error&& <div className="btn btn-outline-danger mt-2">{error}</div>}
          </Form>
          </div>
      </div>
    </>
  )
}

export default SignUp