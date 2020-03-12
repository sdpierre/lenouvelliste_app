
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MenuScreen from './components/MenuScreen';
import SectionScreen from './components/SectionScreen';
import AccountScreen from './components/AccountScreen';
import SettingsScreen from './components/SettingsScreen';
import DetailScreen from './components/DetailScreen'

const MenuStackNav = createStackNavigator({
    Menu: {
        screen: MenuScreen
    },
    Section: {
        screen: SectionScreen,
    },
    Account: {
        screen: AccountScreen,
    },
    Settings: {
        screen: SettingsScreen,
    },
    Detail: {
        screen: DetailScreen,
    }
}, {
    initialRouteName: 'Menu',
    headerMode: 'none',
    mode: 'modal'
});

const MenuNavigator = createAppContainer(MenuStackNav);
export default MenuNavigator;
