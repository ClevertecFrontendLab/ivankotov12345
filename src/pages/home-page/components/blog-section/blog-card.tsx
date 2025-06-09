import { Card, CardBody, Text, VStack } from '@chakra-ui/react';

import { User } from '~/components/user';
import { DATA_TEST_ID } from '~/constants/test-id';
import { BloggerType } from '~/types/blogger';

export const BlogCard: React.FC<BloggerType> = ({ firstName, lastName, login, avatar, notes }) => (
    <Card data-test-id={DATA_TEST_ID.blogsСard}>
        <CardBody
            pt={{ base: 4, '2xl': 6 }}
            px={{ base: 4, '2xl': 6 }}
            pb={{ base: 4, '2xl': 5 }}
            borderRadius='lg'
        >
            <VStack spacing={{ base: 3, '2xl': 5 }} align='start'>
                <User firstName={firstName} lastName={lastName} login={login} avatar={avatar} />
                {notes.length > 0 && (
                    <Text noOfLines={3} data-test-id={DATA_TEST_ID.blogsCardNotesText}>
                        {notes[0].text}
                    </Text>
                )}
            </VStack>
        </CardBody>
    </Card>
);
