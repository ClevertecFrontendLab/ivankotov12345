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

export const CategoryItem: React.FC<NavMenuItem> = ({ path, category, image, subCategories }) => (
    <AccordionItem border='none'>
        <NavLink
            to={`${path}${subCategories[0].path}`}
            data-test-id={path === ROUTER_PATHS.veganPage && 'vegan-cuisine'}
        >
            <AccordionButton>
                <Image src={image} />
                <Text flex='1' textAlign='start'>
                    {category}
                </Text>
                <AccordionIcon as={ArrowIcon} boxSize={4} />
            </AccordionButton>
        </NavLink>

        <AccordionPanel>
            <VStack alignItems='start' gap={0}>
                {subCategories.map((subCategory) => (
                    <Link
                        key={subCategory.category}
                        as={NavLink}
                        to={`${path}${subCategory.path}`}
                        variant='navigationLink'
                    >
                        {subCategory.category}
                    </Link>
                ))}
            </VStack>
        </AccordionPanel>
    </AccordionItem>
);
