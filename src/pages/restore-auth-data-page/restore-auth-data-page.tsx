import { useState } from 'react';
import { useNavigate } from 'react-router';

import { ModalWrapper } from '~/components/modal-wrapper';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { DATA_TEST_ID } from '~/constants/test-id';

import { CheckEmailForm } from './components/check-email-form';
import { CheckOtp } from './components/check-otp';
import { RestoreDataForm } from './components/restore-data-form';

const testIdSteps = [
    DATA_TEST_ID.sendEmailModal,
    DATA_TEST_ID.verificationCodeModal,
    DATA_TEST_ID.resetCredentialsModal,
];

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
        <ModalWrapper isOpen={true} onClose={onClose} testId={testIdSteps[step]}>
            {restoreAuthDataSteps[step]}
        </ModalWrapper>
    );
};
