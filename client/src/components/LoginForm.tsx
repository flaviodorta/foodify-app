import { KeyRound, UserCircle2, Eye, EyeOff } from 'lucide-react';
import Button from './Button';
import GoogleSVG from './icons/GoogleSVG';
import { useState } from 'react';

type LoginFormProps = {
  goToSignUp: () => void;
};

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className='flex flex-col gap-6'>
      <div className='text-center'>
        <h1 className='mb-2.5 text-3xl font-bold'>Sign In</h1>
        <p className='text-gray-600'>Sign in to Foodify with your account.</p>
      </div>

      <div className='space-y-2'>
        <label
          htmlFor='email'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Email
        </label>

        <div className='flex'>
          <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
            <UserCircle2 size={16} />
          </span>
          <input
            type='text'
            id='email'
            className='rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Enter your email address'
          />
        </div>
      </div>

      <div className='space-y-2'>
        <label
          htmlFor='password'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Password
        </label>
        <div className='flex'>
          <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
            <KeyRound size={16} />
          </span>
          <div className='relative w-full'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              className='rounded-none focus:border-primary rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Enter your password'
            />
            {showPassword === false && (
              <span
                onClick={toggleShowPassword}
                className='absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 p-1 hover:ring-1 ring-black/20 rounded'
              >
                <Eye size={24} />
              </span>
            )}

            {showPassword === true && (
              <span
                onClick={toggleShowPassword}
                className='absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 p-1 hover:ring-1 ring-black/20 rounded'
              >
                <EyeOff size={24} />
              </span>
            )}
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <input
            id='default-checkbox'
            type='checkbox'
            value=''
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
          />
          <label
            htmlFor='default-checkbox'
            className='ml-2 text-sm  text-gray-600 dark:text-gray-300'
          >
            Remember-me
          </label>
        </div>

        <div className='text-sm flex items-center text-gray-600'>
          <span>Don't have an account yet?</span>
          <span
            className='underline ml-1 cursor-pointer'
            onClick={props.goToSignUp}
          >
            Sign up
          </span>
        </div>
      </div>

      <Button className='w-full'>Sign In</Button>

      <div className='flex items-center relative my-2'>
        <span className='h-[1px] border border-dashed border-[#20202020] w-full' />
        {/* <span className='bg-white text-gray-500 absolute p-2 left-1/2 -translate-x-1/2'>
          Or
        </span> */}
      </div>

      <Button variant='outline' className='flex gap-3 w-full'>
        <GoogleSVG size={32} />
        <span>Sign in with Google</span>
      </Button>
    </div>
  );
};

export default LoginForm;
