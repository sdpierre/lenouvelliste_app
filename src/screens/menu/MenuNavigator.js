
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MenuScreen from './components/MenuScreen';
import SectionScreen from './components/SectionScreen';
import LoginScreen from '../loginFlow/components/Login';
import SettingsScreen from './components/SettingsScreen';
import NewsScreen from '../news/newsScreen';
import RegisterScreen from '../loginFlow/components/Register';
import RegisterdoneScreen from '../loginFlow/components/RegisterDone';
import ForgotScreen from '../loginFlow/components/Forgot'
import ForgotPWOTPScreen from '../loginFlow/components/ForgotPWOTP'
import ResetPasswordScreen from '../loginFlow/components/ResetPW'
import ForgotDoneScreen from '../loginFlow/components/ForgotDone'
import UserProfileScreen from '../profile/UserProfileScreen' 
import CitizenMapScreen from '../citizen/components/CitizenMapScreen';
import CitizenSaveScreen from '../citizen/components/CitizenSaveScreen';
import CitizenProgressScreen from '../citizen/components/CitizenProgressScreen';
import ChangePasswordScreen from '../profile/ChangePasswordScreen';

const MenuStackNav = createStackNavigator({
    Menu: {
        screen: MenuScreen,
    },
    Section: {
        screen: SectionScreen,
    },
    News: {
        screen: NewsScreen,
    },
    Account: {
        screen: LoginScreen,
    },
    Settings: {
        screen: SettingsScreen, 
    },
    UserProfile: {
        screen: UserProfileScreen, 
    },
    ChangePassword:{
       screen: ChangePasswordScreen,
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
    },
    CitizenMapScreen: {
        screen: CitizenMapScreen
    },
    CitizenSaveScreen: {
        screen: CitizenSaveScreen
    },
    CitizenProgressScreen: {
        screen: CitizenProgressScreen
    },
}, {
    initialRouteName: 'Menu',
    headerMode: 'none',
    mode: 'card'
});

const MenuNavigator = createAppContainer(MenuStackNav);
export default MenuNavigator;
