// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Page404 from "./components/Page404";
import Post from "./components/Post";
import EditPost from "./components/EditPost";
import Protected from "./components/Protected";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route element={<Protected/>}>
            <Route path="/post" element={<Post />} />
            <Route path="/post/:id" element={<EditPost />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
  );
}

export default App;
