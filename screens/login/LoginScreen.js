import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../../components/LoginAuth/AuthContent';
import LoadingOverlay from '../../components/LoginAuth/LoginUI/LoadingOverlay';
import { AuthContext } from '../../context/auth-context';
import { login } from '../../util/auth';

function LoginScreen() {

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authContext = useContext(AuthContext);

    async function loginHandler({ email, password }) {
        setIsAuthenticating(true);
        try {
            const token = await login(email, password);
            authContext.authenticate(token);
        } catch (error) {
            Alert.alert(
                'Authentication failed!',
                'Could not log you in. Please check your credentials or try again later!'
            );
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging you in..." />;
    }

    return <AuthContent isLogin onAuthenticate={loginHandler} />;
}


export default LoginScreen;