import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Image,
    Link,
    Text,
    VStack,
} from '@chakra-ui/react';
import { NavLink } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { NavMenuItem } from '~/types/nav-menu';

import { ArrowIcon } from '../icons';

export const CategoryItem: React.FC<NavMenuItem> = ({ category, imgSrc, subCategories }) => (
    <AccordionItem border='none'>
        <NavLink to={`${ROUTER_PATHS.veganPage}${subCategories[0].path}`}>
            <AccordionButton>
                <Image src={imgSrc} />
                <Text flex='1' textAlign='start'>
                    {category}
                </Text>
                <AccordionIcon as={ArrowIcon} boxSize={4} />
            </AccordionButton>
        </NavLink>

        <AccordionPanel>
            <VStack alignItems='start' gap={0}>
                {subCategories.map(({ category, path }) => (
                    <Link
                        key={category}
                        as={NavLink}
                        to={`${ROUTER_PATHS.veganPage}${path}`}
                        variant='navigationLink'
                    >
                        {category}
                    </Link>
                ))}
            </VStack>
        </AccordionPanel>
    </AccordionItem>
);
