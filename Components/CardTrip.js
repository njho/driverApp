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


import NavigationService from './Helpers/NavigationService';
import agent from './Helpers/agent';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const mapStateToProps = state => ({
    octane: state.common.octane,
    isOnShift: state.common.isOnShift,

    user: state.auth.user,
    optimizedRoutes: state.routing.optimizedRoutes,
    acceptedJob: state.routing.acceptedJob,
    acceptedJobMeta: state.routing.acceptedJobMeta,


    routeInfo: state.routing.routeInfo,
    customerMeta: state.routing.customerMeta
});

const mapDispatchToProps = dispatch => ({
    takeJob: (uid) => {
        dispatch(agent.actions.takeJob(uid))
    },
    getRouteInfo: (jobId, uid) => {
        dispatch(agent.getters.getRouteInfo(jobId, uid));
    },
    getAcceptedJob: (uid) => {
        dispatch(agent.getters.getAcceptedJob(uid));
    },
});

class CardTrip extends React.Component {
    constructor() {
        super();
    };

    takeJob = () => {
        console.log('Do something to accept a job');
        this.props.takeJob(this.props.user.uid);
    };

    openNavigation() {
        var url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${this.props.routeInfo.routing.location.lat},${this.props.routeInfo.routing.location.lng} `;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }


    componentWillMount() {
        this.props.getAcceptedJob(this.props.user.uid);
    }

    componentWillUnmount() {
        //Refactor to facilitate unmount listeners
    }

    componentWillReceiveProps(nextProps) {
        console.log('These are the nextProps cardtrip');
        console.log(nextProps);
    }


    render() {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.stripContainer}>
                    <View style={styles.strip}>
                    </View>
                </View>
                <View style={styles.secondContainer}>
                    {this.props.routeInfo === null ? null : <View style={styles.customerContainer}>
                        <Text style={styles.customer}>
                            {this.props.customerMeta.firstName} {this.props.customerMeta.lastName}</Text>
                        <TouchableOpacity onPress={() => this.openNavigation()}>
                            <Text style={styles.address}>
                                Lat: {this.props.routeInfo.routing.location.lat},{"\n"}
                                Lng: {this.props.routeInfo.routing.location.lat}{"\n"}
                            </Text>
                        </TouchableOpacity>
                        <Text>
                            {this.props.routeInfo.vehicle.year} {this.props.routeInfo.vehicle.make} {this.props.routeInfo.vehicle.model}  </Text>
                        <Text>
                            {this.props.routeInfo.vehicle.license}</Text>
                        <Text>
                            {this.props.routeInfo.vehicle.octane} - 60 Litres</Text>
                        <View style={styles.outlineButton}>
                            <Text style={styles.outlineButtonText}>
                                Delivery By: {this.props.routeInfo.routing.end}
                            </Text>
                        </View>
                    </View>}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonOne}
                                          onPress={() => NavigationService.navigate('Arrive')}>
                            <Icon name="ios-checkmark" size={40} color={'white'}/>
                            <Text style={styles.buttonOneText}>Arrive</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonTwo}
                                          onPress={() => NavigationService.navigate('Cancelled')}>
                            <Icon name="ios-close" size={40} color={'red'}/>
                            <Text style={styles.buttonTwoText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        )
            ;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardTrip);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#4a4847'
    }, secondContainer: {
        paddingLeft: 30, paddingTop: 30,
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
        top: 0,
        height: height,
        backgroundColor: '#c6dffb',
        position: 'absolute',

        left: 2,
        bottom: 0,
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
        width: width,
        borderRadius: 5,


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

