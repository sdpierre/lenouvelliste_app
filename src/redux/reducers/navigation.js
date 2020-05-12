import { createNavigationReducer } from 'react-navigation-redux-helpers';
import AppNavigator from '../../screens/AppNavigator';
import AuthNavigator from '../../screens/AuthNavigator';
export default createNavigationReducer(AppNavigator,AuthNavigator);
// export default createNavigationReducer(AuthNavigator);