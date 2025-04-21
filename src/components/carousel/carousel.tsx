import 'swiper/swiper-bundle.css';

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton } from '@chakra-ui/react';
import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { CARD_DATA } from '~/constants/card-data';
import { PAGE_TITLES } from '~/constants/page-titles';

import { CarouselCard } from './carousel-card';

const { title } = PAGE_TITLES.newest;

const carouselCardsData = CARD_DATA.sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(
    0,
    10,
);

export const Сarousel: React.FC = () => {
    const swiperRef = useRef<SwiperRef | null>(null);

    const onBack = () => swiperRef.current?.swiper.slidePrev();
    const onForward = () => swiperRef.current?.swiper.slideNext();
    return (
        <Box as='section' mt={{ base: 0, lg: 6 }} mb={{ base: 8, xl: 10 }}>
            <Heading as='h2' variant='section' mb={6}>
                {title}
            </Heading>
            <Box pos='relative' zIndex={0}>
                <IconButton
                    size='lg'
                    icon={<ArrowBackIcon />}
                    aria-label='carousel button back'
                    pos='absolute'
                    top='calc(50% - 38px)'
                    transform='translate(-10%, -50%)'
                    zIndex={2}
                    variant='black'
                    display={{ base: 'none', lg: 'block' }}
                    onClick={onBack}
                />

                <Swiper
                    slidesPerView={4}
                    spaceBetween={12}
                    modules={[Navigation]}
                    ref={swiperRef}
                    loop={true}
                    breakpoints={{
                        320: { slidesPerView: 2.05 },
                        640: { slidesPerView: 3.1 },
                        768: { slidesPerView: 4.1 },
                        1180: { slidesPerView: 2.05 },
                        1360: { slidesPerView: 3.05 },
                        1600: { slidesPerView: 4 },
                    }}
                >
                    {carouselCardsData.map((props) => (
                        <SwiperSlide key={props.id}>
                            <CarouselCard {...props} />
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
                    zIndex={2}
                    variant='black'
                    display={{ base: 'none', lg: 'block' }}
                    onClick={onForward}
                />
            </Box>
        </Box>
    );
};
