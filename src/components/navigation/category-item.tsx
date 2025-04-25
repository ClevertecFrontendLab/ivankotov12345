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
import { NavLink, useLocation } from 'react-router';

import { NavMenuItem } from '~/types/nav-menu';

import { ArrowIcon } from '../icons';

export const CategoryItem: React.FC<NavMenuItem> = ({ path, category, image, subcategories }) => {
    const { pathname } = useLocation();
    const [, secondItemPath] = pathname.split('/').filter(Boolean);

    return (
        <AccordionItem border='none'>
            <NavLink to={`/${path}/${subcategories[0].path}`} data-test-id={category}>
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
                    {subcategories.map((subcategory, index) => {
                        const isActiveSubCategory = subcategory.category === secondItemPath;
                        return (
                            <Link
                                key={subcategory.category}
                                as={NavLink}
                                to={`/${path}/${subcategory.path}`}
                                variant='navigationLink'
                                data-test-id={
                                    isActiveSubCategory
                                        ? `${subcategory.path}-active`
                                        : `tab-${subcategory.path}-${index}`
                                }
                            >
                                {subcategory.category}
                            </Link>
                        );
                    })}
                </VStack>
            </AccordionPanel>
        </AccordionItem>
    );
};
