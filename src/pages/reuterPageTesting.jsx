import { useEffect } from 'react';

export const ReuterPageTesting = () => {
  const iframeSrc = 'https://reuters-sg6p.vercel.app/';

  useEffect(() => {
    window.open(iframeSrc, '_blank');
  }, []);

  return null;
};
