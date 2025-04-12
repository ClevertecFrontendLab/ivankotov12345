import { Card, CardBody, Text, VStack } from '@chakra-ui/react';

import { BlogCardData } from '~/types/card-data';

import { User } from '../user';

export const BlogCard: React.FC<BlogCardData> = ({ user, message }) => (
    <Card>
        <CardBody
            pt={{ base: 4, '2xl': 6 }}
            px={{ base: 4, '2xl': 6 }}
            pb={{ base: 4, '2xl': 5 }}
            borderRadius='lg'
        >
            <VStack spacing={{ base: 3, '2xl': 5 }} align='start'>
                <User {...user} />
                <Text noOfLines={3}>{message}</Text>
            </VStack>
        </CardBody>
    </Card>
);
