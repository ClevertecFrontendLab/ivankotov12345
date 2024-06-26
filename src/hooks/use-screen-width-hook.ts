import { useEffect,useState } from 'react';

export const useScreenWidth = () => {
    const [width, setWidth] = useState<number | null>(0);

    useEffect(() => {
      const resizeHandler = () => setWidth(window.innerWidth);

      window.addEventListener('resize', resizeHandler);

      resizeHandler();

      return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    return width;
}