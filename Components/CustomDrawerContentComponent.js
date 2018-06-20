import React from 'react';
import {StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import {
    SwitchNavigator,
    createStackNavigator,
    StackNavigator,
    createDrawerNavigator,
    DrawerItems,
    SafeAreaView
} from 'react-navigation';
import firebase from 'react-native-firebase';


const logout = (props) => {
    console.log(props);
    firebase.auth().signOut();
    props.navigation.navigate('Loading');

};

class CustomDrawerContentComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            // firebase things?
        };
    }
    logout = () => {
        // firebase.auth().signOut();

        this.props.navigation.navigate('Loading');

        console.log('fuck')
    };

    render() {
        return <ScrollView>
            <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
                <DrawerItems {...this.props} />
                <TouchableOpacity onPress={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    }

}

export default CustomDrawerContentComponent;

const styles = StyleSheet.create({});

