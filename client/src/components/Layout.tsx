import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className='layout flex flex-col min-h-screen'>
      <Header />
      <main
        id='main-content'
        className='w-full flex-1 p-4 md:p-8 max-w-full lg:max-w-4/5 mx-auto transition-all duration-600 ease-in-out'
      >
        <Outlet />
      </main>
    </div>
  );
}
