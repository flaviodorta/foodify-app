import { twMerge } from 'tailwind-merge';

type ButtonProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<'button'> & {
    variant?: 'solid' | 'outline';
  };

const Button: React.FC<ButtonProps> = ({ variant = 'solid', ...props }) => {
  return (
    <button
      {...props}
      className={twMerge([
        'font-bold rounded-md flex items-center justify-center whitespace-nowrap w-24 h-12',
        variant === 'solid' && 'bg-primary hover:brightness-95',
        variant === 'outline' &&
          'border-solid border-[1px] border-primary hover:bg-primary/20 ',
        props.className,
      ])}
    >
      {props.children}
    </button>
  );
};

export default Button;
