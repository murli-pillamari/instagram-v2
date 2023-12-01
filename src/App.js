import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import AddPost from "./components/addPost";

class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div className="m-20">
          <div className="border rounded-md py-5 px-30 w-4/12 mx-auto shadow-2xl overflow-y-scroll max-h-screen">
            <div className="text-center">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/AddPost" element={<AddPost />} />
                <Route path="/AddPost/:paramUserId" element={<AddPost />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
