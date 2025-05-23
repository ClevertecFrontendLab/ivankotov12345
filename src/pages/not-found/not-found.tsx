import { Center, Heading, Image, Link, Text, VStack } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import notFound from '~/assets/not-found.png';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { ERROE_PAGE_SIZES } from '~/constants/styles/sizes';
import { DATA_TEST_ID } from '~/constants/test-id';

export const NotFound: React.FC = () => (
    <Center h={ERROE_PAGE_SIZES.errorPageHeight} justifyContent='center' gap={0}>
        <VStack w={{ base: ERROE_PAGE_SIZES.base, lg: ERROE_PAGE_SIZES.lg }} p={8}>
            <Image
                src={notFound}
                alt='Not found'
                mb={8}
                w={{ base: ERROE_PAGE_SIZES.imageBase, lg: ERROE_PAGE_SIZES.imagelg }}
            />

            <Heading
                as='h1'
                mb={4}
                fontSize='2xl'
                fontWeight='bold'
                textAlign='center'
                w={{ base: ERROE_PAGE_SIZES.titleWidthBase, lg: ERROE_PAGE_SIZES.titleWidthFull }}
            >
                Упс! Такой страницы нет
            </Heading>
            <Text color={COLORS_BLACK_ALPHA[700]} textAlign='center'>
                Можете поискать другой рецепт{' '}
                <Link
                    as={NavLink}
                    to={ROUTER_PATHS.homePage}
                    textDecor='underline'
                    data-test-id={DATA_TEST_ID.errorPageGoHome}
                >
                    здесь.
                </Link>
            </Text>
        </VStack>
    </Center>
);
