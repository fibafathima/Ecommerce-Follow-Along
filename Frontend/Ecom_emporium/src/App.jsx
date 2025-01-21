import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login.jsx";
import SignUp from "./components/signup.jsx"
import Home from "./components/Home.jsx";

// ... rest of the code remains the same

function App() {
  return (
    <>
    {/* <SignUp /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>   
    </BrowserRouter>
    </>
  );
}

export default App;