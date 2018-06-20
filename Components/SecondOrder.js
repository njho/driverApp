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
import {DrawerActions} from 'react-navigation';
import {withNavigation} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';


import {connect} from 'react-redux';


import Icon from 'react-native-vector-icons/Ionicons';
import ServiceListItem from './ServiceListItem'


import firebase from 'react-native-firebase';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const mapStateToProps = state => ({
    octane: state.common.octane
});

const mapDispatchToProps = dispatch => ({
    octaneSelected: (value) => {
        dispatch({type: 'OCTANE_SELECTED', octane: value});
    },
});

class SecondOrder extends React.Component {
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


    static navigationOptions = {
        header: null,
        drawerLabel: 'Home',
        drawerIcon: ({tintColor}) => (
            <Icon name="ios-home" size={25} color={tintColor}/>
        ),
    };

    gasSelection = (value) => {
        this.interactable.snapTo({index: 1});
        this.props.octaneSelected(value);
    };

    pickerToggled(uid, value) {
        var newArray = [];
        if (value) {
            newArray = update(this.props.selected, {$push: [uid]});
        } else {
            // newArray = this.props.selected.filter(e => e !== uid);
            // console.log(this.props.selected);
        }
    }
    ;

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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Emergency')}>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon name="ios-warning" size={25} color={'red'}/>
                            <Text style={{color: 'red'}}>&emsp; Emergency Stop</Text>

                        </View>
                    </TouchableOpacity>

                    <Text style={styles.title}>{this.formatDate(Date.now())}</Text>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardContainer}>
                        <View style={styles.stripContainer}>
                            <View style={styles.strip}>
                            </View>
                            <View style={styles.button}>

                                <Text style={styles.buttonText}>
                                    14:00
                                </Text>

                            </View>
                        </View>
                        <View style={styles.customerContainer}>
                            <Text style={styles.customer}>
                                Jill Jillenhall </Text>
                            <TouchableOpacity onPress={() => this.openNavigation()}>
                                <Text>
                                    45 Broadmoor Avenue SW, Calgary
                                </Text>
                            </TouchableOpacity>
                            <Text>
                                Red Acura NSX </Text>
                            <Text>
                                BNN-2260</Text>
                            <Text>
                                Regular 87 - 650 Litres</Text>
                            <View style={styles.outlineButton}>
                                <Text style={styles.outlineButtonText}>
                                    Availability: 14:00 - 16:00
                                </Text>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buttonOne}
                                              onPress={() => this.props.navigation.navigate('Arrive')}>
                                <Icon name="ios-checkmark" size={40} color={'white'}/>
                                <Text style={styles.buttonOneText}>Arrive</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonTwo}
                                              onPress={() => this.props.navigation.navigate('Cancelled')}>
                                <Icon name="ios-close" size={40} color={'red'}/>
                                <Text style={styles.buttonTwoText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.callContainer} onPress={() => this.callCustomer()}>
                        <Icon name="ios-call" size={25} color={'white'}/>
                        <Text style={styles.callContainerText}>Call Customer</Text>
                    </TouchableOpacity>
                </View>
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
    topBar: {
        backgroundColor: 'white',
        elevation: 10,
        width: width,
        padding: 15,
        flexDirection: 'row',
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

