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
    Animated,
    Linking
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import ShiftStart from './ShiftStart'
import agent from './Helpers/agent';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const mapStateToProps = state => ({
    octane: state.common.octane,
    isOnShift: state.common.isOnShift,

    user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
    takeJob: (uid) => {
        dispatch(agent.actions.takeJob(uid))
    }
});

class CardNoJobs extends React.Component {
    constructor() {
        super();
    };

    takeJob = () => {
        console.log('Do something to accept a job');
        this.props.takeJob(this.props.user.uid);
    };

    render() {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.stripContainer}>
                    <View style={styles.strip}>
                    </View>
                </View>
                <View style={styles.customerContainer}>
                    <Text style={styles.customer}>
                        Accept Your First Job</Text>

                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonOne}
                                      onPress={() => this.takeJob()}>
                        < Icon name="ios-checkmark" size={40} color={'white'}/>
                        <Text style={styles.buttonOneText}>Accept a Job</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
            ;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardNoJobs);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#4a4847'
    },
    customerContainer: {
        paddingTop: 10,
        paddingBottom: 20,
    },
    customer: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    address: {
        textDecorationLine: 'underline'
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
        width: width - 60,
        borderTopWidth: 1,
        borderColor: '#dfd9d7',
        paddingVertical: 20,
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#2c8dfb',
        flex: 0,
        flexShrink: 1,
        alignSelf: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 40
    },
    stripContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 0,
        flexShrink: 1,
    },
    strip: {
        width: 8,
        height: 60,
        backgroundColor: '#c6dffb',
        position: 'absolute',
        left: 20,
        bottom: 20,
    },
    buttonOne: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2c8dfb',
        flex: 0,
        flexShrink: 1,
        alignSelf: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 40,
        marginRight: 15
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
        borderRadius: 5,
        marginTop: 30,
        paddingTop: 30,
        paddingLeft: 30,

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

