import { useState } from 'react';
import { useNavigate } from 'react-router';

import { ModalWrapper } from '~/components/modal-wrapper';
import { ROUTER_PATHS } from '~/constants/router-paths';

import { CheckEmailForm } from './components/check-email-form';
import { CheckOtp } from './components/check-otp';
import { RestoreDataForm } from './components/restore-data-form';

export const RestoreAuthDataPage: React.FC = () => {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const onClose = () => navigate(ROUTER_PATHS.signIn);

    const restoreAuthDataSteps = [
        <CheckEmailForm step={step} setStep={setStep} setEmail={setEmail} />,
        <CheckOtp step={step} setStep={setStep} email={email} />,
        <RestoreDataForm email={email} onClose={onClose} />,
    ];

    return (
        <ModalWrapper isOpen={true} onClose={onClose}>
            {restoreAuthDataSteps[step]}
        </ModalWrapper>
    );
};
