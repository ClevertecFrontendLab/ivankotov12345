import { Button, Card, CardBody, CardFooter, Flex, Spacer, Text, VStack } from '@chakra-ui/react';

import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
import { BloggerType } from '~/types/blogger';

import { LikeIcon, PeopleIcon } from '../icons';
import { StatButton } from '../stat-button';
import { User } from '../user';

export const BlogCard: React.FC<BloggerType> = (props) => (
    <Card>
        <CardBody
            pt={{ base: 4, '2xl': 6 }}
            px={{ base: 4, '2xl': 6 }}
            pb={{ base: 4, '2xl': 5 }}
            borderRadius='lg'
        >
            <VStack spacing={{ base: 3, '2xl': 5 }} align='start'>
                <User {...props} />

                {props.notes.length > 0 && <Text noOfLines={3}>{props.notes[0].text}</Text>}
            </VStack>
        </CardBody>

        <CardFooter>
            <Flex w={SIZES.full} gap={2}>
                <Button variant={STYLE_VARIANTS.black} size='xs'>
                    Подписаться
                </Button>
                <Button variant={STYLE_VARIANTS.limeButton} size='xs'>
                    Читать
                </Button>

                <Spacer />

                <StatButton icon={<LikeIcon />} quantity={props.bookmarksCount} size='xs' />
                <StatButton icon={<PeopleIcon />} quantity={props.subscribersCount} size='xs' />
            </Flex>
        </CardFooter>
    </Card>
);
