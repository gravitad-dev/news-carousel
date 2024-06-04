import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  getReutersData,
  getCnnData,
  getPaisData,
} from "@/services/graphql.services";
import { Button } from "@/components/ui/button";

// URLs
const WEBS = ["reutres", "cnn", "elpais"];

//components
const CarouselAds = lazy(() => import("./components/CarouselAds"));
const Frame = lazy(() => import("./components/Frame"));

// Works also with SSR as expected
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        switch (import.meta.env.VITE_SITE) {
          case "reuters":
            result = await getReutersData();
            break;
          case "cnn":
            result = await getCnnData();
            break;
          case "elpais":
            result = await getPaisData();
            break;
          default:
            // Establece una acción predeterminada o manejo de error si es necesario
            break;
        }
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //console.log(import.meta.env.VITE_SITE);

  return (
    <div className="bg-[#2c2c2c] w-full h-[100vh]">
      <div className="adsConatiner">
        <Suspense fallback={<p>Loading...</p>}>
          {data && <CarouselAds data={data} />}
        </Suspense>
      </div>
      <div className="iframeContainer">
        a
      </div>
    </div>
  );
}

export default App;
