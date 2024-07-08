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
  };

  const sendClickCounts = async (counts, country) => {
    const advertisingId = location.pathname.split('/')[3];
    // validar que no se envíe vacío
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
        // Limpiar el estado local solo después de que se envíe con éxito
        localStorage.setItem('clickCounts', JSON.stringify(0));
        setClickCounts(0);
      } catch (error) {
        console.error('Error sending click counts:', error);
        // En caso de error, guardar el estado localmente y tratar de enviar de nuevo
        localStorage.setItem('clickCounts', JSON.stringify(counts));
      }
    }
  };

  useEffect(() => {
    // Llamar a sendClickCounts cuando clickCounts cambia y no es cero
    if (clickCounts > 0) {
      sendClickCounts(clickCounts, cntry);
    }
  }, [clickCounts, cntry]);

  return {
    clickCounts,
    handleClick,
  };
};
