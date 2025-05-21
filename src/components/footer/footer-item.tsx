import { IconButton, Text, VStack } from '@chakra-ui/react';

import { SIZES } from '~/constants/styles/sizes';

type FooterItemProps = {
    icon: React.ReactElement;
    description: string;
    variant?: string;
    textColor?: string;
};

export const FooterItem: React.FC<FooterItemProps> = ({
    icon,
    description,
    variant,
    textColor,
}) => (
    <VStack gap={1} py={2.5}>
        <IconButton
            aria-label='edit button'
            icon={icon}
            borderRadius={SIZES.full}
            size='md'
            variant={variant}
        />
        <Text fontSize='xs' color={textColor}>
            {description}
        </Text>
    </VStack>
);
