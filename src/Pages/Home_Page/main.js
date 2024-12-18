import React from "react";
import Main from "./Home_Page";
import Slider from "./Banner";
const HomePage = () => {
  return (
    <div>
      <div>
        <Main />
      </div>
      <div id="slider">
        <Slider id="slider" />
      </div>
    </div>
  );
};

export default HomePage;