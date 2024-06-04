import React from "react";
import { Link } from "react-router-dom";

// Works also with SSR as expected
function App() {
  //console.log(import.meta.env.VITE_SITE);

  return (
    <div className="bg-[#2c2c2c] w-full h-[100vh] flex flex-col align items-center">
        <h1 className="flex text-2xl text-white pt-[20%]">Carousels Advertaising</h1>
        <div className="flex flex-col gap-2 bg-gray-700 min-w-[240px]  px-8 py-4 rounded-md shadow-lg mt-5">
          <Link to={"/cnn"} className="text-gray-300 hover:text-white">Cnn</Link>
          <Link to={"/pais"} className="text-gray-300 hover:text-white">El país</Link>
          <Link to={"/reuters"} className="text-gray-300 hover:text-white">Reuters</Link>
        </div>
    </div>
  );
}

export default App;
