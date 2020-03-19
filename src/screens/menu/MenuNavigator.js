
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MenuScreen from './components/MenuScreen';
import SectionScreen from './components/SectionScreen';
import LoginScreen from '../loginFlow/components/Login';
import SettingsScreen from './components/SettingsScreen';
import NewsScreen from '../news/newsScreen';
import RegisterScreen from '../loginFlow/components/Register';
import RegisterdoneScreen from '../loginFlow/components/RegisterDone';
import HomeScreen from '../home/components/HomeScreen';
import ForgotScreen from '../loginFlow/components/Forgot'


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
    Register:{
        screen:RegisterScreen,
    },
    RegisterDone:{
        screen:RegisterdoneScreen,
    },
    Home:{
        screen:HomeScreen
    },
    Forgot:{
        screen:ForgotScreen
    }
}, {
    initialRouteName: 'Menu',
    headerMode: 'none',
    mode: 'modal'
});

const MenuNavigator = createAppContainer(MenuStackNav);
export default MenuNavigator;
