import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useClickCount } from '../hooks/useClickCount';
import { fetchCountryByIP } from '../services/getCountry';
import { useParams } from 'react-router-dom';

function CarouselAds({ data }) {
  const [imagesArr, setImagesArr] = useState([]);
  const [country, setCountry] = useState('INT');
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );
  const { campaignId } = useParams();

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => a.order - b.order);
    setImagesArr(sortedData);
    const fetchCountry = async () => {
      setCountry(await fetchCountryByIP());
    };
    fetchCountry();
  }, [data]);

  const { clickCounts, handleClick } = useClickCount();

  return (
    <div className="flex justify-center items-center w-full bg-black py-[12px] md:py-[8px] shadow-sm">
      {/* debug */}
      <span className="absolute z-10 bottom-[10px] left-[10px] w-[fit-content] p-2 rounded-md bg-neutral-500 text-white">
        {JSON.stringify(clickCounts)}
      </span>
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-[996px]"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.reset()}
      >
        <CarouselContent>
          {imagesArr.map((element, index) => (
            <CarouselItem
              key={element.id}
              id={campaignId}
              onClick={() => handleClick(country)}
            >
              <div className="flex h-[130px] md:h-[140px]">
                <img
                  src={element.image.url}
                  alt={element.name}
                  id={index === 0 ? 'firstCarouselImage' : ''}
                  className="w-full object-cover object-center"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>
  );
}

export default CarouselAds;
