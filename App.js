import React from 'react';
import {StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native';

import firebase from 'react-native-firebase';
import {
    SwitchNavigator,
    createStackNavigator,
    StackNavigator,
    createDrawerNavigator,
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
              <Navigator/>
            </Provider>

        );
    }
}

const AuthStack = StackNavigator({
    Loading: Loading,
    Login: Login
});

const OrderStack = StackNavigator({
    Home: SecondOrder, //SecondOrder
    Arrive: Arrived,
    Cancelled: Cancelled

});
// const ArrivedStack = StackNavigator({
// });

const drawerNav = createDrawerNavigator({
    Home: OrderStack,
    Settings: PersonalInfo,
    Emergency: Emergency
}, {
    title: 'SureFuel',
    contentComponent: CustomDrawerContentComponent
});

const Navigator = new SwitchNavigator(
    {
        App: drawerNav,
        Loading: AuthStack,
        // Arrived: ArrivedStack
    },
    {
        initialRouteName: 'Loading',
    }
);

export default App ;
//
// <Text style={styles.modulesHeader}>The following Firebase modules are enabled:</Text>
// {firebase.admob.nativeModuleExists && <Text style={styles.module}>Admob</Text>}
// {firebase.analytics.nativeModuleExists && <Text style={styles.module}>Analytics</Text>}
// {firebase.auth.nativeModuleExists && <Text style={styles.module}>Authentication</Text>}
// {firebase.crashlytics.nativeModuleExists && <Text style={styles.module}>Crashlytics</Text>}
// {firebase.firestore.nativeModuleExists && <Text style={styles.module}>Cloud Firestore</Text>}
// {firebase.messaging.nativeModuleExists && <Text style={styles.module}>Cloud Messaging</Text>}
// {firebase.links.nativeModuleExists && <Text style={styles.module}>Dynamic Links</Text>}
// {firebase.iid.nativeModuleExists && <Text style={styles.module}>Instance ID</Text>}
// {firebase.notifications.nativeModuleExists && <Text style={styles.module}>Notifications</Text>}
// {firebase.perf.nativeModuleExists && <Text style={styles.module}>Performance Monitoring</Text>}
// {firebase.database.nativeModuleExists && <Text style={styles.module}>Realtime Database</Text>}
// {firebase.config.nativeModuleExists && <Text style={styles.module}>Remote Config</Text>}
// {firebase.storage.nativeModuleExists && <Text style={styles.module}>Storage</Text>}


//// export default createSwitchNavigator({
//         SignIn: {
//             screen: App
//         },
//         BasicOrder: {
//             screen: BasicOrder
//         }
//     },
// );
//
