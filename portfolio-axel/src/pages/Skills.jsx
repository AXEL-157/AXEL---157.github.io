import cssIcon from "../image/icone/Skills/css.png";
import htmlIcon from "../image/icone/Skills/html.png";
import jsIcon from "../image/icone/Skills/js.png";
import pythonIcon from "../image/icone/Skills/python.png";
import reactIcon from "../image/icone/Skills/react.png";
import vitIcon from "../image/icone/Skills/vit.png";

function Skills() {
  return (
    <div className="Skills">
      <h1>Compétences</h1>
      <h2>Compétences que je suis en train d'apprendre ou d'aprefondire </h2>
      <ul>
        <div className="skill-item">
        <img src={htmlIcon} alt="HTML" style={{ width: '48px', height: '48px' }} />
      </div>
      <div className="skill-item">
        <img src={jsIcon} alt="JavaScript" style={{ width: '48px', height: '48px' }} />
      </div>
      <div className="skill-item">
        <img src={reactIcon} alt="React" style={{ width: '48px', height: '48px' }} />
      </div>
      <div className="skill-item">
        <img src={pythonIcon} alt="Python" style={{ width: '48px', height: '48px' }} />
      </div>
      <div className="skill-item">
        <img src={vitIcon} alt="Vite" style={{ width: '48px', height: '48px' }} />
      </div>
      </ul>
    </div>
  );
}

export default Skills;
