import { Icon, IconProps } from '@chakra-ui/react';

export const BurgerIcon: React.FC<IconProps> = (props) => (
    <Icon viewBox='0 0 16 12' {...props}>
        <path d='M0 0H16V2H0V0ZM0 5H16V7H0V5ZM0 10H16V12H0V10Z' fill='black' />
    </Icon>
);
