import { Accordion, Button, Text, VStack } from '@chakra-ui/react';

import { NAV_MENU_ITEMS } from '~/constants/nav-menu';

import { CategoryItem } from './category-item';
import { ExitIcon } from './exit-icon';

export const Navigation: React.FC = () => (
    <VStack
        justifyContent='space-between'
        h='full'
        pos='relative'
        overflowY='auto'
        height='calc(100vh - 80px)'
    >
        <Accordion>
            {NAV_MENU_ITEMS.map(({ category, imgSrc, subCategories }) => (
                <CategoryItem
                    key={category}
                    category={category}
                    imgSrc={imgSrc}
                    subCategories={subCategories}
                />
            ))}
        </Accordion>

        <VStack gap={4} alignItems='start' px={6} pb={8} fontSize='xs'>
            <Text color='blackAlpha.400' fontWeight='medium'>
                Версия программы 3.25
            </Text>
            <Text color='blackAlpha.400'>
                Все права защищены, <br /> ученический файл, <br /> ©Клевер Технолоджи, 2025
            </Text>
            <Button leftIcon={<ExitIcon />} variant='ghost' p={0}>
                Выйти
            </Button>
        </VStack>
    </VStack>
);
