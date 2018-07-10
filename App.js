import React from 'react';
import {StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native';

import firebase from 'react-native-firebase';
import {
    SwitchNavigator,
    createStackNavigator,
    StackNavigator,
    createDrawerNavigator,
    DrawerNavigator,
    DrawerItems,
    SafeAreaView
} from 'react-navigation';


import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import store from './store';

import Loading from './Components/Loading';
import PersonalInfo from './Components/PersonalInfo'
import Login from './Components/Login'
import SecondOrder from './Components/SecondOrder';
import Emergency from './Components/Emergency'
import Arrived from './Components/Arrived'
import Cancelled from './Components/Cancelled'
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationService from './Components/Helpers/NavigationService';



import CustomDrawerContentComponent from './Components/CustomDrawerContentComponent'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const mapStateToProps = state => ({
    subscriberSessionId: state.navigationReducer.subscriberSessionId
});

const mapDispatchToProps = dispatch => ({
    timeToggle: (value) => {
        dispatch({type: 'TIME_TOGGLE', isTimeInput: value});
    },
});


class App extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
    }

    render() {
        return (
            <Provider store={store}>
                <Navigator
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}/>
            </Provider>

        );
    }
}

const AuthStack = StackNavigator({
    Loading: Loading,
    Login: Login
});

const OrderStack = StackNavigator({
    Home: {
        screen: SecondOrder,
    },
    Arrive: Arrived,
    Cancelled: Cancelled,
    Emergency: Emergency

});
// const ArrivedStack = StackNavigator({
// });

const drawerNav = DrawerNavigator({
    Home: {
        screen: OrderStack,
        navigationOptions: {
            title: 'Home',
            headerTitle: 'Home',
            drawerIcon: ({tintColor}) => <Icon name="ios-home" size={25} color={tintColor}/>
        }
    },
    Settings: PersonalInfo,
}, {
    title: 'SureFuel',
    contentComponent: CustomDrawerContentComponent
});

const homeDrawerIcon = ({tintColor}) => getDrawerIcon('home', tintColor);

const Navigator = new SwitchNavigator(
    {
        App: {
            screen: drawerNav,

        },
        Loading: AuthStack,
    },
    {
        initialRouteName: 'Loading',
    }
);

export default App;

