import React from 'react';
import {StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Alert, Dimensions} from 'react-native';
import {
    SwitchNavigator,
    createStackNavigator,
    StackNavigator,
    createDrawerNavigator,
    DrawerItems,
    SafeAreaView
} from 'react-navigation';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import agent from './Helpers/agent';

const height = Dimensions.get('window').height;

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    setIsOffShift: (uid) => dispatch(agent.actions.setIsOffShift(uid))

});

class CustomDrawerContentComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            // firebase things?
        };
    }

    logout = () => {
        firebase.auth().signOut().then(() => this.props.navigation.navigate('Loading'));
    };

    endShift = () => {
        Alert.alert(
            'End Shift',
            "Are you sure you'd like to end your shift?",
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => this.props.setIsOffShift(this.props.user.uid)},
            ],
            {cancelable: true}
        )
    }

    render() {
        return <ScrollView style={{height: height}}>
            <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
                <DrawerItems {...this.props} />
                <View style={styles.bottomButtons}>
                    <TouchableOpacity style={styles.menuRow} onPress={() => this.endShift()}>
                        <Icon style={{marginHorizontal: 25}} name="ios-time" color={'#adcaf3'} size={25}/>
                        <Text style={[styles.logoutText, {color: '#adcaf3'}]}>End Shift</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuRow} onPress={() => this.logout()}>
                        <Icon style={{marginHorizontal: 25}} color={'#adcaf3'} name="ios-log-out" size={25}/>
                        <Text style={[styles.logoutText, {color: '#adcaf3'}]}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContentComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height * 0.95,
    },
    bottomButtons: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        alignSelf: 'stretch'
    },
    menuRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        paddingVertical: 10,
        flex: 1,
        alignItems: 'center'
    },
    logoutText: {
        fontWeight: 'bold',
        color: 'black'
    }
});

