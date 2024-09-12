import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useClickCount } from '../hooks/useClickCount';
import { fetchCountryByIP } from '../services/getCountry';
import { useParams } from 'react-router-dom';

const autoplayPlugin = Autoplay({ delay: 5000, stopOnInteraction: false });

function CarouselAds({ data }) {
  const [imagesArr, setImagesArr] = useState([]);
  const [country, setCountry] = useState('INT');
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
      <Carousel
        plugins={[autoplayPlugin]}
        className="w-full max-w-[996px]"
        onMouseEnter={() => autoplayPlugin.stop()}
        onMouseLeave={() => autoplayPlugin.play()}
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
      </Carousel>
    </div>
  );
}

export default CarouselAds;
