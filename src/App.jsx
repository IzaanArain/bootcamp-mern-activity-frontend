import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom"
import { UseAuthContext } from "./hooks/useAuthContext"
//pages & components
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import MyFooter from "./components/MyFooter"
import NotFoundPage from "./pages/NotFoundPage"
function App() {
  const {user}=UseAuthContext()
  return (
    <>
     <div>
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        {/* Protecting Routes */}
        <Routes>
          <Route 
          path="/" 
          element={user ? <Home/> : <Navigate to="/login"/>}/>
          <Route 
          path="/login" 
          element={!user ? <Login/> : <Navigate to="/"/>}/>
          <Route 
          path="/signup"
           element={!user ? <SignUp/> : <Navigate to="/"/>}/>
           <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </div>
      <MyFooter/>
      </BrowserRouter>
     </div>
    </>
  )
}

export default App
