import { useState, useEffect } from 'react';
import PremiumWebinarLanding from './components/PremiumWebinarLanding';
import AdCreatives from './components/AdCreatives';

function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (route === '#/ads') {
    return <AdCreatives />;
  }

  return <PremiumWebinarLanding />;
}

export default App;
