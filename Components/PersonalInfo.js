import React from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    Image,
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';


import firebase from 'react-native-firebase';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default class PersonalInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            // firebase things?
        };
    }

    static navigationOptions = {
        header: null,
        drawerLabel: 'Settings',
        drawerIcon: ({tintColor}) => (
            <Icon name="ios-cog" size={25} color={tintColor}/>

        ),

    };


    render() {
        return (
            <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.avoidingView} contentContainerStyle={{paddingBottom: 5}} enabled>

            <LinearGradient colors={['#484e4e', '#37abb8']}
                                style={styles.container}>

                    <View style={styles.logoContainer}>

                        <Image source={require('../assets/sure-fuel-icon.png')} style={[styles.logo]}/>
                        <Text style={styles.welcome}>
                            THANK YOU FOR CHOOSING SUREFUEL!
                        </Text>
                        <Text style={styles.subheader}>
                            Please provide your updated contact information to help us serve you better.
                        </Text>
                    </View>


                    <View style={styles.listContainer}>

                        <View style={styles.listItem}>
                            <TextInput
                                style={styles.textInput}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholderTextColor={'white'}
                                placeholder={'Please Enter Your Name'}></TextInput>
                        </View>
                        <View style={styles.listItem}>
                            <TextInput
                                style={styles.textInput}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholderTextColor={'white'}
                                placeholder={'E-mail'}></TextInput>
                        </View>
                        <View style={styles.listItem}>
                            <TextInput
                                style={styles.textInput}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholderTextColor={'white'}
                                placeholder={'Phone Number'}></TextInput>
                        </View>
                        <TouchableOpacity style={{alignSelf: 'stretch'}}>
                            <View style={{
                                borderColor: 'white',
                                borderWidth: 1,
                                borderRadius: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 10,
                                alignSelf: 'stretch',
                            }}>
                                <Text style={{color: 'white', fontSize: 18}}>SUBMIT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </KeyboardAvoidingView>

        )
            ;
    }
}

const styles = StyleSheet.create({
    avoidingView: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 20
    },

    logo: {
        height: 90,
        width: 90,
    },
    logoContainer: {
        flex: 1,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
        color: 'white',
        fontWeight: 'bold',
    },
    subheader: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        marginHorizontal: 20
    },
    listContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignSelf: 'stretch'
    },
    listItem: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        marginBottom: 5
    },
    textInput: {
        color: 'white',
        alignSelf: 'stretch',
        borderBottomWidth: 0,
        borderColor: 'transparent',
        textAlign: 'center'
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

