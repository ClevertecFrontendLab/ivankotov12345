import { IconButton, Text, VStack } from '@chakra-ui/react';

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
    <VStack gap={1}>
        <IconButton
            aria-label='edit button'
            icon={icon}
            borderRadius='full'
            size='md'
            variant={variant}
        />
        <Text fontSize='xs' color={textColor}>
            {description}
        </Text>
    </VStack>
);
