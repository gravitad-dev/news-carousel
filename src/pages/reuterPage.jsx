// ReuterPage.jsx
import React, { useEffect, useState } from 'react';

export const ReuterPage = () => {
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    // Llama a la ruta del backend para obtener el HTML
    fetch('https://za-backend-1.onrender.com/scraping') // Cambia esto si es necesario
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((html) => {
        // Crea un objeto Blob y un URL para el iframe
        const blob = new Blob([html], { type: 'text/html' });
        setIframeSrc(URL.createObjectURL(blob));
      })
      .catch((error) => {
        console.error('Error fetching HTML:', error);
      });
  }, []);

  return (
    <div>
      <iframe
        src={iframeSrc}
        style={{ width: '100%', height: '500px', border: 'none' }}
        title="Reuter Iframe"
      />
    </div>
  );
};
