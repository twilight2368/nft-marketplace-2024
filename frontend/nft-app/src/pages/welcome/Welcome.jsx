import React from "react";
import WelcomeNavbar from "../../components/navbar/WelcomeNavbar";
import HeroImageBlur from "../../components/herodisplay/HeroImageBlur";
import HeroTextDisplay from "../../components/herodisplay/HeroTextDisplay";
import WelcomeFooter from "../../components/footer/WelcomeFooter";
import TopNFTDisplay from "../../components/welcome-title/TopNFTDisplay";
import TopNFTartistDisplay from "../../components/welcome-title/TopNFTartistDisplay";
import BrowserNFTWelcome from "../../components/welcome-title/BrowserNFTWelcome";
import TopCollectionWelcome from "../../components/welcome-title/TopCollectionWelcome";
import { Button } from "@nextui-org/react";

export default function Welcome() {
  return (
    <div className="dark">
      <div id="welcomenavbar" className="mb-16">
        <WelcomeNavbar />
      </div>
      <div id="herodisplay">
        <div className=" grid grid-cols-2 ">
          <div>
            <HeroTextDisplay />
          </div>
          <div>
            <HeroImageBlur />
          </div>
        </div>
      </div>
      <div className="min-h-screen mx-40 p-2">
        <div id="top-nft-display-welcome" className="mb-20">
          <TopNFTDisplay />
        </div>
        <div>
          <TopNFTartistDisplay />
        </div>
        <div>
          <BrowserNFTWelcome />
        </div>
        <div>
          <TopCollectionWelcome />
        </div>
        <div className=" px-60">
          <h2 className="text-center text-4xl font-bold mb-5">📦Blockchain</h2>
          <div className="text-lg px-10 text-center text-gray-500 mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, cum nesciunt iste, quia iusto animi hic ab sunt quam
            eum voluptas at aperiam velit rem! Iusto modi aut explicabo dolore.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus explicabo quae modi culpa blanditiis. Ut voluptatibus
            asperiores repellat obcaecati itaque earum, voluptates maiores amet
            nemo placeat iure suscipit tempora qui. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Quos veniam pariatur officia
            repudiandae, animi ab dolor veritatis sequi temporibus commodi iusto
            hic architecto iste ex consequuntur culpa. Optio, alias maxime!
          </div>
          <div className="text-center">
            <Button variant="flat" color="danger" onClick={(e)=>{
              e.preventDefault()
              window.scrollTo(0,0)
            }}>
              Back to top
            </Button>
          </div>
        </div>
      </div>
      <div>
        <WelcomeFooter />
      </div>
    </div>
  );
}
