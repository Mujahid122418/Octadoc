import Login from "./components/screens/Auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/screens/PageNotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
