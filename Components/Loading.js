import React from 'react';
import {StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native';

import firebase from 'react-native-firebase';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default class BasicOrder extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
    }

    componentDidMount() {
        // firebase.auth().onAuthStateChanged(user => {
        //     console.log('There is a user Logged In');
        //     console.log(user);
        //     // firebase.auth().signOut()
        //     this.props.navigation.navigate(user ? 'secondOrder' : 'SecondOrder') //Appo
        // })
           this.props.navigation.navigate('Home') //Appo

    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/LoginBackground.png')}
                       style={{
                           position: 'absolute',
                           resizeMode: 'cover',
                           width: width,
                           height: height,

                       }}/>


                <View style={styles.logoContainer}>

                    <Image source={require('../assets/sure-fuel-icon.png')} style={[styles.logo]}/>
                    <Text style={styles.welcome}>
                        SUREFUEL </Text>
                    <Text style={styles.subheader}>
                        TAP THE APP TO FILL </Text>
                </View>

                <View style={styles.loginContainer}>


                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    logo: {
        marginBottom: 16,
        marginTop: 32,
        height: 125,
        width: 125,
    },
    logoContainer: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color: 'white',
        fontWeight: 'bold',
    },
    subheader: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modulesHeader: {
        fontSize: 16,
        marginBottom: 8,
    },
    module: {
        fontSize: 14,
        marginTop: 4,
        textAlign: 'center',
    }
});
