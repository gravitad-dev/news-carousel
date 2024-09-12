// import.meta.env.VITE_BASE_URL;
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { getImagesToAnalytics } from '../services/getImagesToAnalytics';
import { useParams } from 'react-router-dom';

//components
const CarouselAds = lazy(() => import('@/components/CarouselAds'));
// const Frame = lazy(() => import('@/components/Frame'));

// Works also with SSR as expected
export function AnalyticsPage() {
  const [data, setData] = useState(null);
  const { projectId, campaignId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log('Project ID:', projectId);
        // console.log('Campaign ID:', campaignId);
        const result = await getImagesToAnalytics(projectId, campaignId);
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
          {data && <CarouselAds data={data} />}
        </Suspense>
      </div>
    </div>
  );
}
