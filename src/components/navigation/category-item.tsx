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
        <NavLink to={ROUTER_PATHS.veganPage}>
            <AccordionButton>
                <Image src={imgSrc} />
                <Text flex='1' textAlign='start'>
                    {category}
                </Text>
                <AccordionIcon as={ArrowIcon} boxSize={4} />
            </AccordionButton>
        </NavLink>

        <AccordionPanel
            _hover={{
                color: 'black',
            }}
        >
            <VStack alignItems='start' gap={0}>
                {subCategories.map((subCategory) => (
                    <Link as={NavLink} to={ROUTER_PATHS.veganPage} key={subCategory} w='full'>
                        {subCategory}
                    </Link>
                ))}
            </VStack>
        </AccordionPanel>
    </AccordionItem>
);
