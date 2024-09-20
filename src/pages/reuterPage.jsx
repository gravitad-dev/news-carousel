import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const ReuterPage = () => {
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    axios
      .get('https://za-backend-1.onrender.com/scraping')
      .then((response) => {
        setIframeSrc(response.data);
      })
      .catch((error) => {
        console.error('Error fetching HTML:', error);
      });
  }, []);

  return (
    <div>
      <iframe
        srcDoc={iframeSrc}
        width="100%"
        className="h-screen"
        title="Reuter Iframe"
      />
    </div>
  );
};
