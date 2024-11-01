import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Chat from "./Pages/Chat"
import NotFound from "./Pages/NotFound"
import { useAuth } from "./context/AuthContext"


function App() {
console.log(useAuth()?.isLoggedIn);

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="*" element={<NotFound/>}/>



      </Routes>
    </>
  )
}

export default App
