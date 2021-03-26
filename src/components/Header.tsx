import chewbacca from "../img/chewbacca.png";
import React from "react";

function Header(){
  return <section className="text-gray-600 body-font">
    <div className="flex flex-col text-center w-full mb-4">
      <img src={chewbacca} alt="Polly" className='mx-auto w-1/5' />
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">List Star Wars characters</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Using the Star Wars API <a href="https://swapi.dev" target='_blank' rel="noreferrer" className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>swapi.dev</a></p>
    </div>
  </section>
}

export default Header;
