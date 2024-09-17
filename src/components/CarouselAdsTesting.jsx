import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useClickCount } from '../hooks/useClickCount';
import { fetchCountryByIP } from '../services/getCountry';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../services/config';
import { countries } from '../utils/countries';

const autoplayPlugin = Autoplay({ delay: 5000, stopOnInteraction: false });

function CarouselAdsTesting({ data }) {
  const [imagesArr, setImagesArr] = useState([]);
  const [country, setCountry] = useState('INT');
  const [checked, setChecked] = useState(false);
  const [labelClick, setLabelClick] = useState({ counts: 0, country: '' });
  const { campaignId } = useParams();

  // probando rangos de clicks
  const [minClicks, setMinClicks] = useState(0);
  const [maxClicks, setMaxClicks] = useState(0);

  // Estado para guardar la referencia al timeout
  const [timeoutRef, setTimeoutRef] = useState(null);

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => a.order - b.order);
    setImagesArr(sortedData);

    const fetchCountry = async () => {
      setCountry(await fetchCountryByIP());
    };
    fetchCountry();
  }, [data]);

  const { clickCounts, handleClick } = useClickCount();

  // Función para generar el número aleatorio
  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Función para iniciar la generación de clicks automáticos
  const startGeneratingClicks = () => {
    if (checked && campaignId && maxClicks !== 0) {
      const min = parseInt(minClicks, 10);
      const max = parseInt(maxClicks, 10);
      let random = 0;

      if (!isNaN(min) && !isNaN(max) && min <= max) {
        random = generateRandomNumber(min, max);
      } else {
        alert('Por favor, ingrese valores válidos para minClick y maxClick.');
      }

      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)];

      setLabelClick({ counts: random, country: randomCountry });

      axiosInstance
        .post(`/clickCounts/${campaignId}`, {
          counts: random,
          country: randomCountry,
        })
        .then((response) => {
          console.log('Post successful:', response.data);
          setLabelClick({ counts: random, country: randomCountry });

          if (checked) {
            const newTimeoutId = setTimeout(startGeneratingClicks, 5000);
            setTimeoutRef(newTimeoutId);
          }
        })
        .catch((error) => {
          console.error('Error posting data:', error);

          if (checked) {
            const newTimeoutId = setTimeout(startGeneratingClicks, 5000);
            setTimeoutRef(newTimeoutId);
          }
        });
    }
  };

  // Función para detener la generación de clicks automáticos
  const stopGeneratingClicks = () => {
    if (timeoutRef) {
      clearTimeout(timeoutRef); // Detiene el timeout activo
      setTimeoutRef(null); // Limpia la referencia
    }
  };

  // Efecto para manejar el estado de checked
  useEffect(() => {
    if (checked) {
      startGeneratingClicks();
    } else {
      stopGeneratingClicks();
    }

    return () => {
      stopGeneratingClicks();
    };
  }, [checked, campaignId]);

  return (
    <div className='flex justify-center items-center w-full bg-black py-[12px] md:py-[8px] shadow-sm'>
      <div className='flex justify-between items-center'>
        <span className='absolute z-10 bottom-[10px] left-[10px] w-[fit-content] p-2 rounded-md bg-neutral-500 text-white'>
          {JSON.stringify(clickCounts)}
        </span>
        <span className='absolute z-10 bottom-[10px] right-[10px] w-[fit-content] p-2 rounded-md bg-neutral-500 text-white'>
          {`${labelClick.counts} - ${labelClick.country}`}
        </span>
      </div>
      <Carousel
        plugins={[autoplayPlugin]}
        className='w-full max-w-[996px]'
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
              <div className='flex h-[130px] md:h-[140px]'>
                <img
                  src={element.image.url}
                  alt={element.name}
                  id={index === 0 ? 'firstCarouselImage' : ''}
                  className='w-full object-cover object-center'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className=' right-[4vw] mr-4 absolute space-x-4 mt-4 text-white '>
        <div className='flex flex-row gap-5'>
          <label htmlFor='min'>
            <b>Min:</b>
            <input
              className='w-10 text-black ml-2 text-center'
              type='number'
              name='min'
              id='min'
              min={0}
              onChange={(e) => {
                setMinClicks(e.target.value);
              }}
            />
          </label>
          <label htmlFor='max'>
            <b>Max:</b>
            <input
              className='w-10 text-black ml-2 text-center'
              type='number'
              name='max'
              id='max'
              min={0}
              onChange={(e) => {
                setMaxClicks(e.target.value);
              }}
            />
          </label>
        </div>

        <div className=' mt-4'>
          <label
            htmlFor='toggle'
            className='text-white flex gap-2 items-center '
          >
            Generate clicks
            <input
              type='checkbox'
              checked={checked}
              onChange={() => setChecked((prevChecked) => !prevChecked)}
              className='toggle-switch cursor-pointer'
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default CarouselAdsTesting;
