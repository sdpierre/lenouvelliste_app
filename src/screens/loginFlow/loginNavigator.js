
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../loginFlow/components/Login';
import RegisterScreen from '../loginFlow/components/Register';
import RegisterdoneScreen from '../loginFlow/components/RegisterDone';
import ForgotScreen from '../loginFlow/components/Forgot'
import ForgotPWOTPScreen from '../loginFlow/components/ForgotPWOTP'
import ResetPasswordScreen from '../loginFlow/components/ResetPW'
import ForgotDoneScreen from '../loginFlow/components/ForgotDone'
//import SplashScreen from '../loginFlow/components/Splash'
const LoginStackNav = createStackNavigator({
    // Splash:{
    //     screen: SplashScreen
    // },
    Account: {
        screen: LoginScreen,
        // navigationOptions: ({ navigation }) => ({
        //     tabBarVisible: navigation.state.index < 1,
        // }),      
    },
    Register:{
        screen:RegisterScreen,
    },
    RegisterDone:{
        screen:RegisterdoneScreen,
    },
    Forgot:{
        screen:ForgotScreen
    },
    ForgotPWOTP:{
        screen:ForgotPWOTPScreen
    },
    ResetPassword:{
        screen:ResetPasswordScreen
    },
    ForgotDone:{
        screen:ForgotDoneScreen
    }
}, {
    initialRouteName: 'Account',
    headerMode: 'none',
    mode: 'card'
});

const LoginNavigator = createAppContainer(LoginStackNav);
export default LoginNavigator;
