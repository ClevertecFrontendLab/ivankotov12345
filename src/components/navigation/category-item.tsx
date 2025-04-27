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

import { DATA_TEST_ID } from '~/constants/test-id';
import { usePathItems } from '~/hooks/use-path-items';
import { NavMenuItem } from '~/types/nav-menu';

import { ArrowIcon } from '../icons';

export const CategoryItem: React.FC<NavMenuItem> = ({ path, category, image, subcategories }) => {
    const { thirdItemPath } = usePathItems();
    return (
        <AccordionItem border='none'>
            <NavLink
                to={`/${path}/${subcategories[0].path}`}
                data-test-id={path === 'vegan' ? DATA_TEST_ID.veganCuisine : category}
            >
                <AccordionButton>
                    <Image src={image} />
                    <Text flex={1} textAlign='start'>
                        {category}
                    </Text>
                    <AccordionIcon as={ArrowIcon} boxSize={4} />
                </AccordionButton>
            </NavLink>

            <AccordionPanel>
                <VStack alignItems='start' gap={0}>
                    {subcategories.map((subcategory) => (
                        <Link
                            key={subcategory.category}
                            as={NavLink}
                            to={`/${path}/${subcategory.path}`}
                            variant='navigationLink'
                            data-test-id={
                                thirdItemPath === subcategory.path && `${subcategory.path}-active`
                            }
                        >
                            {subcategory.category}
                        </Link>
                    ))}
                </VStack>
            </AccordionPanel>
        </AccordionItem>
    );
};
