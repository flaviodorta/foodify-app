import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ISidebarMenuItem, Sidebar, SidebarMenu } from '../components/Sidebar';
import { IceCream, Banana } from 'lucide-react';

const items: ISidebarMenuItem[] = [
  {
    icon: <IceCream size={18} />,
    title: 'Sweets',
  },
  {
    icon: <Banana size={18} />,
    title: 'Fruits',
    items: [
      {
        title: 'Fresh',
      },
      { title: 'Good' },
      {
        title: 'Fresh',
      },
      { title: 'Good' },
      {
        title: 'Fresh',
      },
      { title: 'Good' },
    ],
  },
  {
    icon: <IceCream size={18} />,
    title: 'Sweets',
  },
  {
    icon: <Banana size={18} />,
    title: 'Fruits',
    items: [
      {
        title: 'Fresh',
      },
      { title: 'Good' },
      {
        title: 'Fresh',
      },
      { title: 'Good' },
      {
        title: 'Fresh',
      },
      { title: 'Good' },
    ],
  },
  {
    icon: <IceCream size={18} />,
    title: 'Sweets',
  },
  {
    icon: <Banana size={18} />,
    title: 'Fruits',
    items: [
      {
        title: 'Fresh',
      },
      { title: 'Good' },
      {
        title: 'Fresh',
      },
      { title: 'Good' },
      {
        title: 'Fresh',
      },
      { title: 'Good' },
    ],
  },
  {
    icon: <IceCream size={18} />,
    title: 'Sweets',
  },
  {
    icon: <Banana size={18} />,
    title: 'Fruits',
    items: [
      {
        title: 'Fresh',
      },
      { title: 'Good' },
      {
        title: 'Fresh',
      },
      { title: 'Good' },
      {
        title: 'Fresh',
      },
      { title: 'Good' },
    ],
  },
];

const Public = () => {
  return (
    <div className='flex flex-col w-full h-full'>
      <Navbar />

      <div className='flex h-full'>
        <Sidebar>
          <SidebarMenu items={items} />
        </Sidebar>

        <Outlet />
      </div>
    </div>
  );
};

export default Public;
