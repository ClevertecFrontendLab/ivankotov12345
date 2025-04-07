import { Card, CardBody, Text, VStack } from '@chakra-ui/react';

import { BlogCardData } from '~/types/card-data';

import { User } from '../user';

export const BlogCard: React.FC<BlogCardData> = ({ user, message }) => (
    <Card>
        <CardBody pt={6} px={6} pb={5}>
            <VStack spacing={7} align='start'>
                <User {...user} />
                <Text>{message}</Text>
            </VStack>
        </CardBody>
    </Card>
);
