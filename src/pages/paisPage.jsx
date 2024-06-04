import React, { Suspense, lazy, useEffect, useState } from "react";
import {getPaisData} from "@/services/graphql.services";

//components
const CarouselAds = lazy(() => import("@/components/CarouselAds"));
const Frame = lazy(() => import("@/components/Frame"));

// Works also with SSR as expected
function PaisPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await getPaisData();
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
    </div>
  );
}

export default PaisPage;
