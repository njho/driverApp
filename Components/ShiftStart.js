import React from 'react';
import {
    StyleSheet,
    Platform,
    Image,
    Text,
    View,
    Button,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Linking
} from 'react-native';

import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import agent from './Helpers/agent';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const mapStateToProps = state => ({
    user: state.auth.user,
    isOnShift: state.common.isOnShift
});

const mapDispatchToProps = dispatch => ({
    octaneSelected: (value) => {
        dispatch({type: 'OCTANE_SELECTED', octane: value});
    },
    setShiftStart: (uid) => {
        dispatch(agent.actions.setIsOnShift(uid))
    }
});

class ShiftStart extends React.Component {
    constructor() {
        super();
        this.state = {
            services: [
                {
                    title: 'Windshield Washer Fluid Top Up',
                    price: '$5'
                },
                {
                    title: 'Windshield Chip Repair',
                    price: '$5'
                },
                {
                    title: 'Tire Check & Fill',
                    price: '$5'
                }]

        }
    };


    render() {
        return (

            <View style={styles.card}>
                <View style={styles.stripContainer}>
                    <View style={styles.strip}/>
                </View>
                <View style={{paddingHorizontal: 30, flex: 1, justifyContent: 'space-around'}}>
                    <View style={styles.customerContainer}>
                        <Text style={styles.customer}>
                            It looks like your off shift!</Text>
                        <Text>
                            Go do something else!{"\n"}
                            When you're ready, let us know when you start! </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonOne}
                                          onPress={() => this.props.setShiftStart(this.props.user.uid)}>
                            <Icon name="ios-checkmark" size={40} color={'white'}/>
                            <Text style={styles.buttonOneText}>Start Shift</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftStart);

const styles = StyleSheet.create({

    customerContainer: {
        paddingTop: 10,
        paddingBottom: 20,
    },
    customer: {
        fontSize: 30,
        fontWeight: 'bold'
    },

    topBar: {
        backgroundColor: '#2c8dfb',
        elevation: 10,
        width: width,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    buttonContainer: {
        width: width * 0.9,
        borderTopWidth: 1,
        borderColor: '#dfd9d7',
        paddingTop: 20,

        flexDirection: 'row'
    },
    stripContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 0,
        flexShrink: 1,
        height: height,
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    strip: {
        width: 20,
        height: height,
        backgroundColor: '#c6dffb',
        position: 'absolute',
        bottom: 20,
    },
    buttonOne: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2c8dfb',
        flex: 0,
        flexShrink: 1,
        alignSelf: 'stretch',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 40,
        marginRight: 15,
    },
    buttonOneText: {
        fontSize: 14,
        paddingVertical: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 40,
        color: 'white',
        fontWeight: 'bold'
    },
    buttonTwo: {
        borderColor: '#fb4348',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        flex: 0,
        flexShrink: 1,
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 20,
        borderRadius: 40,
        marginRight: 5
    },
    buttonTwoText: {
        flex: 0,
        flexShrink: 1,
        alignSelf: 'flex-start',
        fontSize: 14,
        paddingVertical: 9,
        paddingLeft: 10,
        paddingRight: 10,
        paddingHorizontal: 20,
        borderRadius: 40,
        color: '#fb4348',
        fontWeight: 'bold'
    },
    outlineButton: {
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#bfbab7',
        flex: 0,
        flexShrink: 1,
        alignSelf: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 40
    },
    outlineButtonText: {
        fontWeight: 'bold',
        color: '#bfbab7'

    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',

    },
    card: {
        backgroundColor: 'white',
        elevation: 10,
        width: width,
        height: height,
        paddingVertical: 30,

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'flex-end'
    },
    callContainer: {
        backgroundColor: '#58B982',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        marginTop: 30,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,


    },
    callContainerText: {
        color: 'white',
        padding: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

