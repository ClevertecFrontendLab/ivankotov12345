import 'swiper/swiper-bundle.css';

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { PAGE_TITLES } from '~/constants/page-titles';
import { CAROUSEL_QUERY_PARAMS } from '~/constants/query-params';
import { DATA_TEST_ID } from '~/constants/test-id';
import { Z_INDEX } from '~/constants/z-index';
import { Endpoints } from '~/query/constants/paths';
import { useGetRecipesInfiniteQuery } from '~/query/services/recipe';

import { CarouselCard } from './carousel-card';

const { title } = PAGE_TITLES.newest;

export const Сarousel: React.FC = () => {
    const swiperRef = useRef<SwiperRef | null>(null);

    const { data } = useGetRecipesInfiniteQuery({
        endpoint: Endpoints.RECIPE,
        ...CAROUSEL_QUERY_PARAMS,
    });

    const carouselCardsData = useMemo(() => data?.pages[0].data || [], [data]);

    const onBack = () => swiperRef.current?.swiper.slidePrev();
    const onForward = () => swiperRef.current?.swiper.slideNext();
    return (
        <Box as='section' mt={{ base: 0, lg: 6 }} mb={{ base: 8, xl: 10 }}>
            <Heading as='h2' variant='section' mb={6}>
                {title}
            </Heading>
            <Box
                pos='relative'
                zIndex={Z_INDEX.base}
                width={{ base: 'calc(100% + 16px)', md: 'full' }}
            >
                <IconButton
                    size='lg'
                    icon={<ArrowBackIcon />}
                    aria-label='carousel button back'
                    pos='absolute'
                    top='calc(50% - 38px)'
                    transform='translate(-10%, -50%)'
                    zIndex={Z_INDEX.carousel}
                    variant='black'
                    display={{ base: 'none', lg: 'block' }}
                    onClick={onBack}
                    data-test-id={DATA_TEST_ID.carouselBack}
                />

                <Swiper
                    data-test-id={DATA_TEST_ID.carousel}
                    slidesPerView={4}
                    spaceBetween={12}
                    modules={[Navigation]}
                    ref={swiperRef}
                    loop={true}
                    breakpoints={{
                        300: {
                            slidesPerView: 2.1,
                            spaceBetween: '12px',
                        },
                        640: {
                            slidesPerView: 3.1,
                            spaceBetween: '12px',
                        },
                        768: {
                            slidesPerView: 4.1,
                            spaceBetween: '16px',
                        },
                        1180: {
                            slidesPerView: 2.05,
                            spaceBetween: '16px',
                        },
                        1360: {
                            slidesPerView: 3.05,
                            spaceBetween: '24px',
                        },
                        1600: {
                            slidesPerView: 4,
                            spaceBetween: '24px',
                        },
                    }}
                >
                    {carouselCardsData.map((props, index) => (
                        <SwiperSlide key={props._id}>
                            <CarouselCard {...props} index={index} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <IconButton
                    size='lg'
                    icon={<ArrowForwardIcon />}
                    aria-label='carousel button forward'
                    pos='absolute'
                    top='calc(50% - 38px)'
                    transform='translate(20%, -50%)'
                    right='0'
                    zIndex={Z_INDEX.carousel}
                    variant='black'
                    display={{ base: 'none', lg: 'block' }}
                    onClick={onForward}
                    data-test-id={DATA_TEST_ID.carouselForward}
                />
            </Box>
        </Box>
    );
};
