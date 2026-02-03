import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";

function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "profil":
        return <Profil />;
      case "skills":
        return <Skills />;
      case "projects":
        return <Projects />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <Navbar setPage={setPage} />
      {renderPage()}
    </>
  );
}

export default App;
