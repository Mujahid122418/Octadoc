import Login from "./components/screens/Auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/screens/PageNotFound/NotFound";
import SideBar from "./components/screens/SideBar/SideBar";
import Header from "./components/screens/Header/Header";

import Home from "./components/screens/Home/Home";
import Setting from "./components/screens/Setting/Setting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="position-relative">
              <Header />
              <SideBar />
              <Home />
            </div>
          }
        />
        <Route
          path="/setting"
          element={
            <div className="position-relative">
              <Header />
              <SideBar />
              <Setting />
            </div>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
