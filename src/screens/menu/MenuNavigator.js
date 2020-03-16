
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MenuScreen from './components/MenuScreen';
import SectionScreen from './components/SectionScreen';
import AccountScreen from './components/AccountScreen';
import SettingsScreen from './components/SettingsScreen';
import NewsScreen from '../news/newsScreen';

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
        screen: AccountScreen,
    },
    Settings: {
        screen: SettingsScreen, 
    }
}, {
    initialRouteName: 'Menu',
    headerMode: 'none',
    mode: 'card'
});

const MenuNavigator = createAppContainer(MenuStackNav);
export default MenuNavigator;
