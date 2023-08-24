import { PropsWithChildren, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar: React.FC<PropsWithChildren> = (props) => {
  return (
    <aside className='scroll overflow-y-auto w-[250px] max-w-[250px] min-w-[250px] max-h-[calc(100vh-80px)] pt-10 px-6 border-r-[1px] border-gray-300'>
      {props.children}
    </aside>
  );
};

type SidebarMenuProps = {
  items: ISidebarMenuItem[];
};

const SidebarMenu: React.FC<SidebarMenuProps> = ({ items }) => {
  return (
    <ul className='w-full min-h-full flex flex-col'>
      {items.map((item, idx) => (
        <SidebarMenuItem
          key={idx}
          title={item.title}
          icon={item.icon}
          items={item.items}
        />
      ))}
    </ul>
  );
};

export type ISidebarMenuItem = {
  icon: React.ReactNode;
  title: string;
  to?: string;
  items?: { title: string; to: string }[];
};

type SidebarMenuItemProps = ISidebarMenuItem;

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  icon,
  title,
  to,
  items,
}) => {
  const navigate = useNavigate();
  const [showItems, setShowItems] = useState(false);

  return (
    <>
      <li
        onClick={to ? () => navigate(to) : () => setShowItems((prev) => !prev)}
        className='cursor-pointer w-flex flex-col mb-4'
      >
        <div className='flex items-center justify-between'>
          <span className='flex items-center gap-3'>
            <span className='text-gray-600'>{icon}</span>
            <span className='font-semibold text-gray-600 '>{title}</span>
          </span>

          {items && (
            <span
              className={twMerge([
                'text-gray-600 transition-all duration-300',
                showItems && '-rotate-180',
              ])}
            >
              <ChevronDown width={18} />
            </span>
          )}
        </div>
      </li>

      <AnimatePresence>
        {items && showItems && (
          <motion.li
            initial={{
              height: 0,
            }}
            animate={{ height: 'fit-content' }}
            exit={{
              height: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className='relative overflow-hidden flex flex-col'
          >
            <AnimatePresence>
              {showItems &&
                items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: { delay: 0.02 * idx, ease: 'easeOut' },
                    }}
                    exit={{
                      x: 0,
                      opacity: 0,
                      transition: { delay: 0.02 * (items.length - 1 - idx) },
                    }}
                    className='mb-4 cursor-pointer ml-[30px] font-semibold text-gray-600'
                  >
                    {item.title}
                  </motion.li>
                ))}
            </AnimatePresence>
          </motion.li>
        )}
      </AnimatePresence>
    </>
  );
};

export { Sidebar, SidebarMenu };
