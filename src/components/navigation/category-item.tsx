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

export const CategoryItem: React.FC<NavMenuItem> = ({ title, category, icon, subCategories }) => {
    const { thirdItemPath } = usePathItems();
    const categoryPath = category && subCategories && `/${category}/${subCategories[0].category}`;
    return (
        <AccordionItem border='none'>
            <NavLink
                to={categoryPath}
                data-test-id={category === 'vegan' ? DATA_TEST_ID.veganCuisine : category}
            >
                <AccordionButton>
                    <Image src={icon} />
                    <Text flex={1} textAlign='start'>
                        {title}
                    </Text>
                    <AccordionIcon as={ArrowIcon} boxSize={4} />
                </AccordionButton>
            </NavLink>

            <AccordionPanel>
                <VStack alignItems='start' gap={0}>
                    {subCategories &&
                        subCategories.map((subCategory) => (
                            <Link
                                key={subCategory.category}
                                as={NavLink}
                                to={`/${category}/${subCategory.category}`}
                                variant='navigationLink'
                                data-test-id={
                                    thirdItemPath === subCategory.category &&
                                    `${subCategory.category}-active`
                                }
                            >
                                {subCategory.title}
                            </Link>
                        ))}
                </VStack>
            </AccordionPanel>
        </AccordionItem>
    );
};
