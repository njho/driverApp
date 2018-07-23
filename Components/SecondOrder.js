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
import CardTrip from './CardTrip';
import CardNoJobs from './CardNoJobs';

import agent from './Helpers/agent';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const mapStateToProps = state => ({
    octane: state.common.octane,
    isOnShift: state.common.isOnShift,
    optimizedRoutes: state.routing.optimizedRoutes,
    acceptedJob: state.routing.acceptedJob

});

const mapDispatchToProps = dispatch => ({

});

class SecondOrder extends React.Component {
    constructor() {
        super();
        this.state = {
            translate: new Animated.Value(height),
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

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.isOnShift === true && this.props.isOnShift === false) {
            Animated.timing(
                this.state.translate,
                {
                    toValue: 0,
                    duration: 500,
                    delay: 10,
                }
            ).start()
        }
    }


    static navigationOptions = {
        header: null,
        drawerLabel: 'Home',
        drawerIcon: ({tintColor}) => (
            <Icon name="ios-home" size={25} color={tintColor}/>
        ),
    };

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    callCustomer() {
        Linking.openURL('tel:4035893536');
    }

    openNavigation() {
        var url = "https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=Los+Angeles";
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                        <Icon name="ios-menu" size={30} color={'white'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Emergency')}>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon name="ios-warning" size={25} color={'white'}/>
                            <Text style={{color: 'white'}}> Emergency Stop</Text>

                        </View>
                    </TouchableOpacity>

                </View>
                {this.props.isOnShift ? null : <ShiftStart/>
                }
                <Animated.View style={[styles.card, {
                    transform: [{translateY: this.state.translate}]
                }]}>
                    {this.props.acceptedJob !== '' ? <CardTrip/> : <CardNoJobs/>}
                </Animated.View>
            </View>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondOrder);

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
        paddingTop: 20,
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

