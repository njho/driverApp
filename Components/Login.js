import React from 'react';
import {
    StyleSheet,
    Platform,
    Image,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native';

import firebase from 'react-native-firebase';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default class BasicOrder extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
            // firebase things?
        };
    }

    componentDidMount() {
        // firebase things?
    }

    login() {
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <KeyboardAvoidingView style={styles.container}  enabled>
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
                            DRIVER APPLICATION </Text>
                    </View>

                    <View style={styles.loginContainer}>
                        <TextInput
                            style={styles.textInput}
                            underlineColorAndroid='rgba(250,250,250,1)'
                            placeholderTextColor={'white'}
                            keyboardType={'email-address'}
                            onChangeText={(text) => this.textHandler('digits', text)}
                            placeholder={'E-mail'}/>
                        <TextInput
                            style={styles.textInput}
                            underlineColorAndroid='rgba(250,250,250,1)'
                            placeholderTextColor={'white'}
                            secureTextEntry={true}
                            password={true}
                            placeholder={'Password'}/>

                        <TouchableOpacity style={{
                            borderRadius: 40,
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                            justifyContent: 'center',
                            width: width * 0.7,
                            backgroundColor: '#58B982',
                            marginBottom: 40,
                        }} onPress={() => this.login()}>


                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: '600',
                                    marginVertical: 15,
                                    fontSize: 15
                                }}>
                                SIGN-IN</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
      // height: height
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        height: height
    },
    textInput: {
        color: 'white'
    },
    logo: {
        marginBottom: 16,
        marginTop: 32,
        height: 125,
        width: 125,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 20,
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
        marginTop: 50,
        flex: 1,
        justifyContent: 'space-around',
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
