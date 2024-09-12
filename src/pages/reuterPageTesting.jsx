import React, { Suspense, lazy, useEffect, useState } from 'react';
import { getReutersData } from '@/services/graphql.services';

//components
const CarouselAdsTesting = lazy(() =>
  import('@/components/CarouselAdsTesting')
);
const Frame = lazy(() => import('@/components/Frame'));

// Works also with SSR as expected
export function ReuterPageTesting() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await getReutersData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  //console.log(import.meta.env.VITE_SITE);

  return (
    <div className="bg-[#2c2c2c] w-full h-[100vh]">
      <div className="adsConatiner">
        <Suspense fallback={<p>Loading...</p>}>
          {data && <CarouselAdsTesting data={data} />}
        </Suspense>
      </div>
    </div>
  );
}
