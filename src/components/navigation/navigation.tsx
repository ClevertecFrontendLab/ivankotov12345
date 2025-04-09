import { Accordion, Button, Text, VStack } from '@chakra-ui/react';

import { NAV_MENU_ITEMS } from '~/constants/nav-menu';

import { CategoryItem } from './category-item';
import { ExitIcon } from './exit-icon';

export const Navigation: React.FC = () => (
    <VStack justifyContent='space-between' h='full'>
        <Accordion overflowY='auto'>
            {NAV_MENU_ITEMS.map(({ category, imgSrc, subCategories }) => (
                <CategoryItem
                    key={category}
                    category={category}
                    imgSrc={imgSrc}
                    subCategories={subCategories}
                />
            ))}
        </Accordion>

        <VStack w='full' pb={8} px={6} gap={4} alignItems='start' fontSize='xs' lineHeight='short'>
            <Text color='blackAlpha.400' fontWeight='medium'>
                Версия программы 3.25
            </Text>
            <Text color='blackAlpha.700'>
                Все права защищены, <br /> ученический файл, <br /> ©Клевер Технолоджи, 2025
            </Text>
            <Button leftIcon={<ExitIcon />} variant='ghost' p={0} size='2xs'>
                Выйти
            </Button>
        </VStack>
    </VStack>
);
