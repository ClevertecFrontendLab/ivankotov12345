import { Avatar, AvatarBadge, Input, useDisclosure } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { ImageIcon } from '~/components/icons';
import { COLORS } from '~/constants/styles/colors';
import { BORDERS } from '~/constants/styles/styles';
import { getFullImagePath } from '~/helpers/get-full-image-path';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUser } from '~/store/slices/user-slice';

import { LoadAvatarModal } from '../load-avatar-modal';

export const LoadAvatar: React.FC = () => {
    const currentUser = useAppSelector(selectCurrentUser);

    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [selectedImageFileName, setSelectedImageFileName] = useState<string | null>(null);

    const { isOpen, onClose, onOpen } = useDisclosure();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onSelectImageBadgeClick = () => inputRef.current?.click();

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setSelectedImageUrl(fileUrl);
            setSelectedImageFileName(file.name);
            onOpen();
        }
    };

    const userPhoto =
        currentUser && currentUser.photoLink && getFullImagePath(currentUser.photoLink);

    return (
        <>
            <Avatar src={userPhoto} size='2xl'>
                <AvatarBadge
                    border={BORDERS.bold}
                    p={3}
                    boxSize={6}
                    bg={COLORS.black}
                    bottom={2}
                    right={2}
                    onClick={onSelectImageBadgeClick}
                >
                    <ImageIcon boxSize={3} color={COLORS.white} />
                </AvatarBadge>
            </Avatar>

            <Input
                type='file'
                accept='image/*'
                ref={inputRef}
                display='none'
                onChange={onImageChange}
            />

            <LoadAvatarModal
                isOpen={isOpen}
                onClose={onClose}
                selectedImageUrl={selectedImageUrl}
                selectedImageFileName={selectedImageFileName}
            />
        </>
    );
};
