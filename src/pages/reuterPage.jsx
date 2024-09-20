import { useEffect } from 'react';

export const ReuterPage = () => {
  const iframeSrc = 'https://reuters2.vercel.app/';

  useEffect(() => {
    window.open(iframeSrc, '_blank');
  }, []);

  return null;
};
