import React, { useState } from 'react';
import hotelImage from "../image/mes projets/hotel.png"; 
import loginImage from "../image/mes projets/login.png";
import todoListImage from "../image/mes projets/etodo.png";
function Projects() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const images = [hotelImage, loginImage, todoListImage, hactonImage];  


  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); 
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="Projects">
      <h1>Projets</h1>
      <ul>
        <li>
          <a href="./mes projets/hotel/">Hotel</a><br />
          <a href="./mes projets/login/">Login</a><br />
          <a href="./mes projets/to-do-list.zip" download="to-do-list">To-Do List</a><br />
       </li>
      </ul>

      <div className="carousel">
        <button className="arrow-button" onClick={prevImage}>{"<"}</button>
        <img src={images[currentImageIndex]} alt="Project" className="carousel-image" />
        <button className="arrow-button" onClick={nextImage}>{">"}</button>
      </div>
    </div>
  );
}

export default Projects;
