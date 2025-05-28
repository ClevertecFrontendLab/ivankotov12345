import { FieldValues, SetFieldValue } from 'react-hook-form';

export const trimOnBlur =
    (fieldName: string, setValue: SetFieldValue<FieldValues>) =>
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const trimmedValue = event.target.value.trim();
        setValue(fieldName, trimmedValue);
    };
