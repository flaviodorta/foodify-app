import { twMerge } from 'tailwind-merge';
import fruit from '../assets/fruit.png';

interface LogoProps {
  className: string;
}

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <div className='flex gap-2'>
      <img src={fruit} alt='fuit' width={twMerge(['30px', props.className])} />
      <span className='text-2xl font-bold'>Foodify</span>
    </div>
  );
};

export default Logo;
