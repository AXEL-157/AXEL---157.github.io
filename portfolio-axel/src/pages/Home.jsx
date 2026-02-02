import React from "react";
import mailIcon from "../image/icone/Contact/mail.png";
import linkedinIcon from "../image/icone/Contact/linkedin.png";
import githubIcon from "../image/icone/Contact/github.png";
import cvIcon from "../image/icone/Contact/CV.png";
function Home() {
  return (
    <div className="home">
      <h1>Bonjour, bienvenue sur mon Portfolio 👋</h1>
      <p>Je suis Axel Arnold, étudiant à Epitech 👨‍💻</p>

      <ul className="contact-list">

        <li className="contact-item">
          <img src={mailIcon} alt="Mail" />
          <a href="mailto:axel.arnold@epitech.eu">axel.arnold@epitech.eu</a>
        </li>
        <li className="contact-item">
          <img src={linkedinIcon} alt="LinkedIn" />
          <a
            href="https://linkedin.com/in/axelarnold"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/axelarnold
          </a>
        </li>
        <li className="contact-item">
          <img src={githubIcon} alt="GitHub" />
          <a
            href="https://github.com/axelarnold"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/axelarnold
          </a>
        </li>
        <li className="contact-item">
          <img src={cvIcon} alt="CV" />
          <a href="/CV/Axel_Arnold_CV.pdf" download>
            Télécharger mon CV
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Home;
