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
import { axiosInstance } from '../services/config';
import { countries } from '../utils/countries';

const autoplayPlugin = Autoplay({ delay: 5000, stopOnInteraction: false });

function CarouselAds({ data }) {
  const [imagesArr, setImagesArr] = useState([]);
  const [country, setCountry] = useState('INT');
  const [checked, setChecked] = useState(false);
  const [labelClick, setLabelClick] = useState({ counts: 0, country: '' });
  const [timeoutId, setTimeoutId] = useState(null);
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

  const handleSwitchChange = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  useEffect(() => {
    const startGeneratingClicks = () => {
      if (checked && campaignId) {
        const counts = Math.floor(Math.random() * 6);
        const randomCountry =
          countries[Math.floor(Math.random() * countries.length)];
        axiosInstance
          .post(`/clickCounts/${campaignId}`, {
            counts,
            country: randomCountry,
          })
          .then((response) => {
            console.log('Post successful:', response.data);
            setLabelClick({ counts, country: randomCountry });
            // Set up the next timeout
            setTimeoutId(setTimeout(startGeneratingClicks, 5000));
          })
          .catch((error) => {
            console.error('Error posting data:', error);
            // Set up the next timeout even if there was an error
            setTimeoutId(setTimeout(startGeneratingClicks, 5000));
          });
      }
    };

    if (checked) {
      startGeneratingClicks();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [checked, campaignId]);

  return (
    <div className="flex justify-center items-center w-full bg-black py-[12px] md:py-[8px] shadow-sm">
      <div className="flex justify-between items-center">
        <span className="absolute z-10 bottom-[10px] left-[10px] w-[fit-content] p-2 rounded-md bg-neutral-500 text-white">
          {JSON.stringify(clickCounts)}
        </span>
        <span className="absolute z-10 bottom-[10px] right-[10px] w-[fit-content] p-2 rounded-md bg-neutral-500 text-white">
          {`${labelClick.counts} - ${labelClick.country}`}
        </span>
      </div>
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
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
      <div className="flex flex-col right-0 mr-4 absolute items-center space-x-4 mt-4 text-white">
        <span>Generate Clicks</span>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleSwitchChange}
          className="toggle-switch"
        />
      </div>
    </div>
  );
}

export default CarouselAds;
