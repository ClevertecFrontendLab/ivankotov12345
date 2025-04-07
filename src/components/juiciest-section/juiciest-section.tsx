import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, SimpleGrid, Spacer } from '@chakra-ui/react';

import { JUICIEST_CARD_DATA } from '~/constants/juiciest-card-data';
import { PAGE_TITLES } from '~/constants/page-titles';

import { FoodCard } from '../food-card';

const { title } = PAGE_TITLES.juiciest;

export const JuiciestSection: React.FC = () => (
    <Box as='section' mb={10}>
        <Flex mb={6}>
            <Heading variant='section'>{title}</Heading>
            <Spacer />
            <Button rightIcon={<ArrowForwardIcon />} bg='lime.400' size='lg'>
                Вся подборка
            </Button>
        </Flex>

        <SimpleGrid columns={2} spacing={6}>
            {JUICIEST_CARD_DATA.map((props) => (
                <FoodCard key={props.id} {...props} />
            ))}
        </SimpleGrid>
    </Box>
);
