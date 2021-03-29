import chewbacca from "../img/chewbacca.png";
import placeholder from "../img/placeholder.png";
import React, {useState} from "react";

function Header(){

  const [ imgLoaded, setImgLoaded ] = useState(false);

  return <section className="text-gray-600 body-font">
    <div className="flex flex-col text-center w-full mb-4">
      <div>
      <img alt='Chewbacca' src={chewbacca} className='mx-auto w-1/5 inline' onLoad={() => setImgLoaded(true)}/>
      { !imgLoaded && <img alt='Chewbacca' src={placeholder} className='mx-auto w-1/5 inline' /> }
      </div>
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">List Star Wars characters</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Sourcecode in <a href="https://github.com/s4nt14go/star-wars-frontend" target='_blank' rel="noreferrer" className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>this repo</a></p>
    </div>
  </section>
}

export default Header;
