import Login from "./components/screens/Auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/screens/PageNotFound/NotFound";
import SideBar from "./components/screens/SideBar/SideBar";
import Header from "./components/screens/Header/Header";

import Home from "./components/screens/Home/Home";
import Setting from "./components/screens/Setting/Setting";

import EditTemplateQuestion from "./components/screens/TemplateQuestion/EditTemplateQuestion";
import ShowTemplateQuestion from "./components/screens/TemplateQuestion/ShowTemplateQuestion";

import SendMail from "./components/screens/Auth/SendMail";
import ForgotPass from "./components/screens/Auth/ForgotPass";
import Admin from "./components/screens/Admin/Admin";
import OTP from "./components/screens/Auth/OTP";
import Category from "./components/screens/Admin/Category/Category";

function App() {
  return (
    <div className="body">
      <BrowserRouter >
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

        <Route
          path="/template"
          element={
            <div className="position-relative">
              <Header />
              <SideBar />
              {/* <Template /> */}
              <Home />
            </div>
          }
        />

        <Route
          path="/community"
          element={
            <div className="position-relative">
              <Header />
              <SideBar />

              <Home />
            </div>
          }
        />

        <Route
          path="/questions/:id"
          element={
            <div className="position-relative">
              <Header />
              <SideBar />
              <ShowTemplateQuestion />
            </div>
          }
        />
        <Route
          path="/questions/edit/:id"
          element={
            <div className="position-relative">
              <Header />
              <SideBar />
              <EditTemplateQuestion />
            </div>
          }
        />

        <Route
          path="/admin"
          element={
            <div className="position-relative">
              <Header />
              <SideBar />
              <Admin />
            </div>
          }
        />

        <Route
          path="/category"
          element={
            <div className="position-relative">
              <Header />
              <SideBar />
              <Category />
            </div>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/SendMail" element={<SendMail />} />
        <Route path="/forgot" element={<ForgotPass />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
