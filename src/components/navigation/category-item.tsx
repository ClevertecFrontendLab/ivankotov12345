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

import { NavMenuItem } from '~/types/nav-menu';

import { ArrowIcon } from '../icons';

export const CategoryItem: React.FC<NavMenuItem> = ({ path, category, imgSrc, subCategories }) => (
    <AccordionItem border='none'>
        <NavLink to={`${path}${subCategories[0].path}`}>
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
