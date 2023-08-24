import Drawer from './Drawer';
import { motion, AnimatePresence } from 'framer-motion';
import { variants } from '../utils/variants';
import LoginForm from './LoginForm';
import { useState } from 'react';

interface LoginModalProps {
  show: boolean;
  toggleShow: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ toggleShow, show }) => {
  const [x, y] = useState(false);

  const t = () => y((p) => !p);

  return (
    <Drawer show={show} toggleShow={toggleShow}>
      <div className='relative'>
        <AnimatePresence>
          {show && (
            <motion.div
              variants={variants.modal}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{ delay: 0.1 }}
              className='overflow-hidden fixed center flex z-[51] bg-white max-w-[35rem] w-full h-[550px] rounded-lg shadow-lg'
            >
              <motion.div
                initial={false}
                animate={x ? { left: '-100%' } : { left: 0 }}
                transition={{
                  type: 'tween',
                  ease: 'easeInOut',
                }}
                className='absolute p-8 top-0 w-full'
              >
                <LoginForm goToSignUp={t} />
              </motion.div>

              <motion.div
                initial={false}
                animate={x ? { left: 0 } : { left: '100%' }}
                transition={{
                  type: 'tween',
                  ease: 'easeInOut',
                }}
                className='absolute p-8 left-full top-0 w-full'
              >
                <LoginForm goToSignUp={t} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Drawer>
  );
};

export default LoginModal;
