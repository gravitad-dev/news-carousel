import { useEffect, useState } from 'react';
import { axiosInstance } from '../services/config';
import { useLocation } from 'react-router-dom';

const INITIAL_COUNTS = 0;

export const useClickCount = () => {
  const [clickCounts, setClickCounts] = useState(() => {
    // Obtener el contador de clics del almacenamiento local al cargar el componente
    const savedCounts = localStorage.getItem('clickCounts');
    return savedCounts ? JSON.parse(savedCounts) : INITIAL_COUNTS;
  });

  const location = useLocation();

  const handleClick = () => {
    const newClickCounts = clickCounts + 1;
    setClickCounts(newClickCounts);
    // Guardar los clics actualizados en el almacenamiento local
    localStorage.setItem('clickCounts', JSON.stringify(newClickCounts));
  };

  const sendClickCounts = async () => {
    let counts =
      JSON.parse(localStorage.getItem('clickCounts')) || INITIAL_COUNTS;
    const advertisingId = location.pathname.split('/')[3];
    // validar que no se envie vacio
    if (counts > 0) {
      axiosInstance
        .post(
          `/clickCounts/${advertisingId}`,
          {
            counts,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          console.log('Click counts sent:', response.data);
        })
        .catch((error) => {
          console.error('Error sending click counts:', error);
        });
    }
  };

  useEffect(() => {
    const interval = setInterval(sendClickCounts, 10000);
    window.addEventListener('beforeunload', sendClickCounts);
    return () => {
      // Limpiar estado y localstorage al desmontar componente
      localStorage.removeItem('clickCounts');
      setClickCounts(INITIAL_COUNTS);
      clearInterval(interval);
      window.removeEventListener('beforeunload', sendClickCounts);
    };
  }, []);

  return {
    clickCounts,
    handleClick,
  };
};
