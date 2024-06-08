
import React, { useState, useEffect } from "react";
import Navitem from "./Navitem";
import { useLocation } from 'react-router-dom';

const Sidenav = () => {
  const [clickedTab, setClickedTab] = useState("");

    const location = useLocation();
    console.log(location)

    useEffect(() => {
      let pathArray = location?.pathname?.split("/")
      let lastParam = pathArray[pathArray.length-1]
      if(lastParam === 'Configuration'){
        setClickedTab('Widget Configurations')
      }
      if(lastParam === 'profile'){
        setClickedTab('Settings')
      }
      if(lastParam === 'upload'){
        setClickedTab('Projects')
      }
    })


  return (
    <div className="flex flex-col w-[20%] border border-r-1 border-gray h-screen bg-[#f3e8ff] rounded-r-lg p-4  ">
      <h1 className="text-purple-700 font-bold text-2xl pl-2 flex gap-2 items-center">
        <svg
          width="40"
          height="40"
          viewBox="0 0 53 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M37.4727 46.8739L29.8109 43.043C27.6752 41.9862 25.1873 41.9862 23.0517 43.043L15.3678 46.8739C8.80679 50.1544 1.87148 43.087 5.3061 36.592L7.11149 33.2014C7.35367 32.7171 7.74998 32.3428 8.23435 32.1446L36.0857 19.617C37.2306 19.1106 38.5736 19.573 39.146 20.6738L47.5344 36.614C50.9691 43.087 44.0338 50.1544 37.4727 46.8739Z"
            fill="#7E22CE"
          />
          <path
            opacity="0.4"
            d="M34.3463 16.9308L16.1163 25.1431C14.0688 26.0678 11.9992 23.8661 13.056 21.8846L19.7491 9.18088C22.5893 3.78675 30.2952 3.78675 33.1354 9.18088L35.4912 13.6723C36.1076 14.8832 35.6013 16.3584 34.3463 16.9308Z"
            fill="#7E22CE"
          />
        </svg>
        <p className="text-3xl">LAMA.</p>{" "}
      </h1>
      <p className="font-semibold text-[14px] text-black mt-4 ml-4">
        Podcast Upload flow
      </p>
      <ul className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <Navitem
            selected={clickedTab === "Projects" || clickedTab === "transcript"}
            name="Projects"
            number="1"
            setClickedTab={setClickedTab}
            navigateTo="/project/0/upload"
          />
          <Navitem
            selected={clickedTab === "Widget Configurations"}
            name="Widget Configurations"
            number="2"
            setClickedTab={setClickedTab}
            navigateTo="/project/Configuration"
          />
        </div>

        <Navitem
          selected={clickedTab === "Settings"}
          name="Settings"
          number="3"
          setClickedTab={setClickedTab}
          navigateTo="/profile"
        />
      </ul>
    </div>
  );
};

export default Sidenav;
