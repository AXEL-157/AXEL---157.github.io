import accueilIcon from "../image/icone/accueil.png";
import profilIcon from "../image/icone/Profil.png";
import compétencesIcon from "../image/icone/Compétences.png";
import projetsIcon from "../image/icone/Projets.png";

function Navbar({ setPage }) {
  return (
      <nav className="navbar">
      <button onClick={() => setPage("home")} className="nav-button">
        <img src={accueilIcon} alt="Home" />
        <span>Home</span>
      </button>
      <button onClick={() => setPage("profil")} className="nav-button">
        <img src={profilIcon} alt="Profil" />
        <span>Profil</span>
      </button>
      <button onClick={() => setPage("skills")} className="nav-button">
        <img src={compétencesIcon} alt="Skills" />
        <span>Skills</span>
      </button>
      <button onClick={() => setPage("projects")} className="nav-button">
        <img src={projetsIcon} alt="Projects" />
        <span>Projects</span>
      </button>
    </nav>
  );
}

export default Navbar;
