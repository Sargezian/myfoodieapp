import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../../../components/LoginAuth/AuthContent';
import LoadingOverlay from '../../../components/LoginAuth/LoginUI/LoadingOverlay';
import { AuthContext } from '../../../context/auth-context';
import { createUser } from '../../../util/auth';

function SignupScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authContext = useContext(AuthContext);

    async function signupHandler({ email, password }) {
        setIsAuthenticating(true);
        try {
            const token = await createUser(email, password);
            authContext.authenticate(token);
        } catch (error) {
            Alert.alert(
                'Authentication failed',
                'Could not create user, please check your input and try again later.'
            );
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating user..." />;
    }

    return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;