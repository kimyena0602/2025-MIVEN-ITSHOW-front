import React from "react";
import { useCoverColor } from "../contexts/CoverColorContext";
import Homestyles from "../styles/Home.module.css";
import SearchBar from "../components/SearchBar";

function Home() {
  //   const img_list = Object.entries(images);

  return (
    <div>
      <Nav />
      <Img_list />
      {/* <SearchBar /> */}
    </div>
  );
}

function Nav() {
  const { coverColor } = useCoverColor();

  return (
    <div>
      <div
        className={Homestyles.Gradation}
      ></div>
      <div className={Homestyles.Allnavcontainer}>
        <div className={Homestyles.Logo}>
          <p className={Homestyles.Clicklogo}>LOGO</p>
        </div>
        <div className={Homestyles.Navdetail}>
          <div className={Homestyles.Navfirstline}>
            <p className={`${Homestyles.Clickhome} ${Homestyles.Clicknav}`}>Home</p>
            <p className={`${Homestyles.Clickbookgallery} ${Homestyles.Clicknav}`}>
              Book Gallery
              book
            </p>
          </div>
          <div className={Homestyles.Navsecondline}>
            <p className={`${Homestyles.Clickwrite} ${Homestyles.Clicknav}`}>Write</p>
            <p className={`${Homestyles.Clickmypage} ${Homestyles.Clicknav}`}>
              My Page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Img_list(){
  return (
    <div>
      <img className="img1" src="/images/We.png" alt="We" />
      <img className="img2" src="/images/3-1.png" alt="img1" />
      <img className="img3" src="/images/live.png" alt="live" />
      <img className="img4" src="/images/9-1.png" alt="img2" />
      <img className="img5" src="/images/in-the.png" alt="in the" />
      <img className="img6" src="/images/10-1.png" alt="img3" />
      <img className="img7" src="/images/8-1.png" alt="img4" />      
      <img className="img8" src="/images/same.png" alt="same" />
      <img className="img9" src="/images/2-1.png" alt="img5" />
      <img className="img10" src="/images/world.png" alt="world" />
      <img className="img11" src="/images/1-2.png" alt="img6" />
      <img className="img12" src="/images/but.png" alt="but" />
      <img className="img13" src="/images/12-1.png" alt="img7" />
      <img className="img14" src="/images/we.png" alt="we" />
      <img className="img15" src="/images/11-1.png" alt="img8" />
      <img className="img16" src="/images/it-in.png" alt="it in" />
      <img className="img17" src="/images/13-1.png" alt="img9" />
      <img className="img18" src="/images/different.png" alt="different" />
      <img className="img19" src="/images/6.png" alt="img10" />
      <img className="img20" src="/images/ways.png" alt="ways" />
      <img className="img21" src="/images/5-1.png" alt="img11" />  
    </div>
  )
}

export default Home;
