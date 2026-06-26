import ButtonConfirm from '../../elements/ButtonConfirm';
import { useNavigate } from 'react-router-dom';
import PageNotFound from '../../assets/svg/page-not-found.svg';
import { useEffect, useState } from 'react';

export default function Error(): JSX.Element {
  //  setup timeout redirection
  const navigate = useNavigate();
  const [count, setCount] = useState(10);
  useEffect(() => {
    if (count < 1) {
      navigate('/');
    } else {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, navigate]); // leanrt: rmb to put dependencies to trigger re-render

  //  visualisation
  return (
    <div
      id="error_container"
      className="fixed px-8 top-18 left-1/2 -translate-x-1/2 z-999 flex flex-col items-center justify-center pt-6 pb-12 overflow-hidden h-screen w-full"
    >
      {/*  Redirecting Section */}
      <div className="text-base md:text-xl mb-4 md:mb-8 transition-all duration-600">
        <p className="font-mono text-gray-800">Redirecting to homepage in {count} seconds...</p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-1 md:gap-8 w-full max-w-5xl px-4 transition-all duration-600">
        {/*  Logo Box */}
        <img
          src={PageNotFound}
          alt="Page not found"
          className="w-40 md:w-72 h-52 md:h-90 px-0 md:px-2 transition-all duration-600"
        />
        {/* Text Box */}
        <div className="text-left flex-1 font-san transition-all duration-600">
          <h2 className="text-4xl md:text-5xl font-bold mb-4  text-teal-900">404 NOT FOUND</h2>
          <h4 className="text-lg md:text-xl text-gray-800 mb-4 md:mb-12">
            The page you're looking for doesn't exist.
          </h4>
          <div className="flex justify-center p-4">
            <ButtonConfirm label="Back Home" onClick={() => navigate('/')} />
          </div>
        </div>
      </div>
    </div>
  );
}
