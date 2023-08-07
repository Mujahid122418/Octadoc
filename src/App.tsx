// import Login from "./components/screens/Auth/Login";
import SideBar from "./components/screens/SideBar/SideBar";
import Home from "./components/screens/Home/Home";
import Header from "./components/screens/Header/Header";


function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      <Header />
      <SideBar />
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
