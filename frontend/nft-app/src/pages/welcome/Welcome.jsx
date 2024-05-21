import React from "react";
import WelcomeNavbar from "../../components/navbar/WelcomeNavbar";
import HeroImageBlur from "../../components/herodisplay/HeroImageBlur";

export default function Welcome() {
  return (
    <div>
      <div id="welcomenavbar" className="mb-16">
        <WelcomeNavbar />
      </div>
      <div id="herodisplay">
        <div className=" grid grid-cols-2 ">
          <div>1</div>
          <div>
            <HeroImageBlur/>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
