import React from 'react';
import {
    StyleSheet,
    Platform,
    Image,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    AsyncStorage
} from 'react-native';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';

import EmailPassword from './Login/EmailPassword'
import agent from './Helpers/agent';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const mapStateToProps = state => ({
    loginState: state.common.loginState
});

const mapDispatchToProps = dispatch => ({
    setLoginState: (value) => {
        dispatch({type: 'SET_LOGIN_STATE', value: value});
    },
    getUser: (uid) => dispatch(agent.getters.getUser(uid)),
    getIsOnShift: (uid) => dispatch(agent.getters.getIsOnShift(uid)),
    getOptimizedRoutes: (uid)=> dispatch(agent.getters.getOptimizedRoutes(uid)),
    setUser: (value) => {
        dispatch({type: 'SET_USER', value: value});
    },
    getAcceptedJob: (uid) => dispatch(agent.getters.getAcceptedJob(uid)),

});


class Loading extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            // this.props.navigation.navigate('Home');
            console.log('This is the user ' + user);
            if (user !== null) {

                this.props.getUser(user.uid);
                this.props.setUser(user);
                this.props.getIsOnShift(user.uid);
                this.props.getOptimizedRoutes(user.uid);
                this.props.getAcceptedJob(user.uid);

                AsyncStorage.setItem('userToken', user.uid);
            } else {
                this.props.setLoginState(1);
            }
        });
        // this.props.navigation.navigate('Home');
    }

    renderView = () => {
        switch (this.props.loginState) {
            case 0:
                return <View style={styles.loginContainer}/>
            case 1:
                return <EmailPassword/>
        }
    };


    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <KeyboardAvoidingView style={styles.container} enabled>
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

                        {this.renderView()}
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);


const styles = StyleSheet.create({
    scrollContainer: {
        height: height,
        width: width
    },
    container: {
        width: width,
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
