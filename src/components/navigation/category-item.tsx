import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';
import { NavLink } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { NavMenuItem } from '~/types/nav-menu';

export const CategoryItem: React.FC<NavMenuItem> = ({ category, imgSrc, subCategories }) => (
    <AccordionItem border='none'>
        <NavLink to={ROUTER_PATHS.veganPage}>
            <AccordionButton
                gap={3}
                py={3}
                pr={2}
                pl={4}
                borderRadius={0}
                fontWeight='medium'
                _hover={{
                    bg: 'lime.50',
                    color: 'black',
                    border: 'none',
                }}
                _expanded={{
                    bg: 'lime.100',
                    fontWeight: 'bold',
                }}
            >
                <Image src={imgSrc} />
                <Text flex='1' textAlign='start'>
                    {category}
                </Text>
                <AccordionIcon />
            </AccordionButton>
        </NavLink>

        <AccordionPanel
            _hover={{
                color: 'black',
            }}
        >
            <VStack alignItems='start'>
                {subCategories.map((subCategory) => (
                    <NavLink to={ROUTER_PATHS.veganPage} key={subCategory}>
                        {subCategory}
                    </NavLink>
                ))}
            </VStack>
        </AccordionPanel>
    </AccordionItem>
);
