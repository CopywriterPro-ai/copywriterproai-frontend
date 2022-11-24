import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ScrollToTop() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  return null;
}
