import fruit from '../assets/fruit.png';
import Button from './Button';
import { useState } from 'react';
import LoginModal from './LoginModal';

const Navbar = () => {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow((p) => !p);

  return (
    <>
      <header className='border-b-[1px] shadow-sm border-gray-300 flex justify-between items-center w-full px-10 py-4 h-[76px]'>
        <div className='flex gap-2'>
          <img src={fruit} alt='fuit' width='30px' />
          <span className='text-2xl font-bold'>Foodify</span>
        </div>

        <div className='flex gap-4'>
          <Button>Sign Up</Button>

          <Button onClick={toggleShow} variant='outline'>
            Sign In
          </Button>
        </div>
      </header>

      <LoginModal show={show} toggleShow={toggleShow} />
    </>
  );
};

export default Navbar;
