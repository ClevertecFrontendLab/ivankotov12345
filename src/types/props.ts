import {
    Control,
    FieldErrors,
    FieldValues,
    SetFieldValue,
    UseFormRegister,
    UseFormRegisterReturn,
} from 'react-hook-form';

import { RecipeSchema } from '~/constants/validation-schemas/recipe';

export type StepFormProps = {
    setStep: (step: number) => void;
    step: number;
};

export type AppInputProps = {
    isInvalid: boolean;
    placeholder: string;
    register: UseFormRegisterReturn;
    testId: string;
    variant: string;
    setValue: SetFieldValue<FieldValues>;
    label?: string;
    hint?: string;
    error?: string;
};

export type RecipeFormProps = {
    register: UseFormRegister<RecipeSchema>;
    setValue: SetFieldValue<FieldValues>;
    control: Control<RecipeSchema>;
    errors: FieldErrors<RecipeSchema>;
};
