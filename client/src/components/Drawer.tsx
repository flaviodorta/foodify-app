import { Portal } from 'react-portal';
import { motion, AnimatePresence } from 'framer-motion';

interface DrawerProps extends React.PropsWithChildren {
  show: boolean;
  toggleShow: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ show, toggleShow, children }) => {
  return (
    <>
      <Portal node={document.getElementById('root')}>
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.12 }}
              onClick={toggleShow}
              className='fixed w-screen h-screen z-50 left-0 top-0 flex-center bg-black'
            />
          )}
        </AnimatePresence>
      </Portal>

      <Portal node={document.getElementById('root')}>{children}</Portal>
    </>
  );
};

export default Drawer;
