import React, { useState } from "react";
import "../../assets/css/home.css";
import { db } from "../../firebase/firebaseConfig";
import HomeProduct from "./homeProduct";
function Home() {
  const [position] = useState([1, 2, 3]);
  return (
    <div className="home">
      <div className="home_container">
        <div className="home_images">
          <img
            className="home_image"
            src="https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg"
            alt=""
          />
        </div>
        {position.map((pos, index) => {
          return <HomeProduct key={index} db={db} position={pos} />;
        })}
      </div>
    </div>
  );
}

export default Home;
