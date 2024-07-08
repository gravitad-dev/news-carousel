import { useEffect, useState } from 'react';
import { axiosInstance } from '../services/config';
import { useLocation } from 'react-router-dom';

const INITIAL_COUNTS = 0;

export const useClickCount = () => {
  const [cntry, setCntry] = useState();
  const [clickCounts, setClickCounts] = useState(() => {
    // Obtener el contador de clics del almacenamiento local al cargar el componente
    const savedCounts = localStorage.getItem('clickCounts');
    return savedCounts ? JSON.parse(savedCounts) : INITIAL_COUNTS;
  });

  const location = useLocation();

  const handleClick = (country) => {
    country && setCntry(country);
    const newClickCounts = clickCounts + 1;
    setClickCounts(newClickCounts);
    sendClickCounts(newClickCounts, country); // Llamar a sendClickCounts con los nuevos clics y el país
    // Guardar los clics actualizados en el almacenamiento local
    localStorage.setItem('clickCounts', JSON.stringify(newClickCounts));
  };

  const sendClickCounts = async (counts, country) => {
    const advertisingId = location.pathname.split('/')[3];
    // validar que no se envie vacio
    if (counts > 0) {
      try {
        const response = await axiosInstance.post(
          `/clickCounts/${advertisingId}`,
          {
            counts,
            country,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Click counts sent:', response.data);
      } catch (error) {
        console.error('Error sending click counts:', error);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      sendClickCounts(clickCounts, cntry);
    }, 10000);

    window.addEventListener('beforeunload', () => {
      sendClickCounts(clickCounts, cntry);
    });

    return () => {
      // Limpiar estado y localstorage al desmontar componente
      localStorage.removeItem('clickCounts');
      setClickCounts(INITIAL_COUNTS);
      clearInterval(interval);
      window.removeEventListener('beforeunload', () => {
        sendClickCounts(clickCounts, cntry);
      });
    };
  }, []);

  return {
    clickCounts,
    handleClick,
  };
};
