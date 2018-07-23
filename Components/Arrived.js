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
    Linking,
    TouchableOpacity, Switch,
    ScrollView,
    Animated,
    Dimensions
} from 'react-native';
import Animation from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ListItem, List,} from 'react-native-elements';
import {connect} from 'react-redux';
import agent from './Helpers/agent';

import CustomerInfo from './CustomerInfo';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const list = {
    chip: {
        title: 'Windshield Chip Repair',
        avatar_url: require('../assets/windshield.png'),
        icon: 'av-timer'
    },
    tire: {
        title: 'Tire Pressure Check',
        avatar_url: require('../assets/tiregauge.png'),
        icon: 'flight-takeoff'
    },
    windshieldTopUp: {
        title: 'Fluid Top Up',
        avatar_url: require('../assets/topup.png'),

        icon: 'flight-takeoff'
    },
};

const mapStateToProps = state => ({
    optimizedRoutes: state.routing.optimizedRoutes,
    routeInfo: state.routing.routeInfo,
    acceptedJob: state.routing.acceptedJob,

    customerMeta: state.routing.customerMeta,


    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    confirmCompletion: (jobId, object, uid) => dispatch(agent.actions.confirmCompletion(jobId, object, uid)),
});


class Arrived extends React.Component {
    constructor() {
        super();
        this.state = {
            // firebase things?
            isOn: true,
            windshieldOn: true,
            progress: new Animated.Value(0),
            animationVisible: false,
            numberServices: 0,
            fuelQuantity: '',
            additionalNotes: '',
            chip: false,
            windshieldTopUp: false,
            tire: false
        };
    }

    static navigationOptions = {
        drawerLabel: 'Arrived',
        title: 'Customer Completion',
        backgroundColor: 'red',
        headerStyle: {
            backgroundColor: '#2c8dfb',
        },
        headerTintColor: 'white',
        drawerIcon: ({tintColor}) => (
            <Icon name="ios-home" size={25} color={tintColor}/>
        ),
    };


    componentWillMount() {
        Object.keys(this.props.routeInfo.servicesSelected).map((key, index) => {
            if (this.props.routeInfo.servicesSelected[key]) {
                this.setState({
                    ...this.state,
                    numberServices: this.state.numberServices + 1
                });
            }
        })

    };

    toggleSwitch(value) {
        switch (value) {
            case 'chip':
                this.setState({...this.state, chip: !this.state.chip});
                return;
            case 'tire':
                this.setState({...this.state, tire: !this.state.tire})
                return;
            case 'windshieldTopUp':
                this.setState({...this.state, windshieldTopUp: !this.state.windshieldTopUp})
                return;
        }
    };


    callCustomer() {
        Linking.openURL(`tel:${this.props.customerMeta.phoneNumber}`);
    }

    textHandler = (type, value) => {
        switch (type) {
            case 'notes':
                this.setState({
                    ...this.state,
                    additionalNotes: value
                });
                break;
            case 'quantity':
                this.setState({
                    ...this.state,
                    fuelQuantity: value
                });
                break;
        }
    };

    completionButton = () => {

        //TODO: CALCULATE CHARGE AMOUNT
        let object = {
            servicesRendered: {
                chip: this.state.chip,
                windshieldTopUp: this.state.windshieldTopUp,
                tire: this.state.tire
            },
            chargeAmount: this.calculateChargeAmount(),
            volume: this.state.fuelQuantity,
            timestamp: Date.now(),

        };
        this.props.confirmCompletion(this.props.acceptedJob, object, this.props.user.uid)
    };

    calculateMaxFill = () => {
        let jobInfo = this.props.routeInfo;
        let maxFill = (jobInfo.serviceCosts.fuelPreAuth / 100) / jobInfo.octanePrice;
        console.log(jobInfo);
        console.log(maxFill);
        return maxFill
    };

    calculateChargeAmount = () => {
        let jobInfo = this.props.routeInfo;
        let fuelPrice = jobInfo.octanePrice;
        let fuelCharge = this.state.fuelQuantity * fuelPrice *100 ;
        let cost = fuelCharge + jobInfo.serviceCosts.serviceCharge + (this.state.chip * jobInfo.serviceCosts.chip + this.state.tire * jobInfo.serviceCosts.tire + this.state.windshieldTopUp *  jobInfo.serviceCosts.windshieldTopUp )
        console.log('This is the calculated Cost + ' + cost/100);
        return cost
    };

    render() {
        console.log('These are the optimizedRoutes');
        console.log(this.props.optimizedRoutes);
        console.log(this.props.routeInfo);
        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{alignItems: 'center'}}
                    style={{
                        width: width,
                    }}>
                    <CustomerInfo/>
                    <TouchableOpacity style={styles.callContainer} onPress={() => this.callCustomer()}>
                        <Icon name="ios-call" size={25} color={'white'}/>
                        <Text style={styles.callContainerText}>Call Customer</Text>
                    </TouchableOpacity>
                    <View style={styles.card}>
                        <Text style={styles.serviceTitle}>
                            SERVICE CHECKOUT </Text>
                        <View style={styles.textLabel}>
                            <TextInput
                                style={styles.textInput}
                                underlineColorAndroid='rgba(250,250,250,1)'
                                autofocus={'true'}
                                keyboardType={'numeric'}
                                placeholder={'Fuel Quantity (Required)'}
                                value={this.state.fuelQuantity}
                                onChangeText={(text) => this.textHandler('quantity', text)}
                            />
                            <Text style={styles.label}>Max Fill: {this.calculateMaxFill().toFixed(3)} L</Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            underlineColorAndroid='rgba(250,250,250,1)'
                            placeholder={'Additional Notes'}
                            value={this.state.additionalNotes}
                            onChangeText={(text) => this.textHandler('notes', text)}
                        />

                        {this.state.numberServices > 0 ? <
                            View style={{paddingTop: 20}}>
                            <Text style={[styles.serviceTitle]}>
                                ADDITIONAL SERVICES </Text>
                            <List>
                                {Object.keys(this.props.routeInfo.servicesSelected).map((key, index) => {
                                    if (this.props.routeInfo.servicesSelected[key]) {
                                        console.log(key);
                                        return <ListItem
                                            key={index}
                                            title={list[key].title}
                                            // roundAvatar
                                            avatar={list[key].avatar_url}
                                            hideChevron={true}
                                            switchButton
                                            switchOnTintColor={'#9eb7f0'}
                                            switchThumbTintColor={'#469cfc'}
                                            switched={this.state[key]}
                                            onSwitch={() => this.toggleSwitch(key)}
                                        />
                                    }
                                })
                                }
                            </List>
                        </View> : null}


                        <View style={styles.completionButtonContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.completionButton()
                                }}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#469cfc',
                                    marginBottom: 10,
                                    marginTop: 20,
                                    elevation: 5
                                }}>
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: '600',
                                        marginVertical: 15,
                                        marginLeft: this.state.animationVisible ? 10 : 0,
                                        fontSize: 15
                                    }}>
                                    CONFIRM COMPLETION</Text>
                                {this.state.animationVisible ?
                                    <View style={{
                                        width: 2,
                                        height: height / 12,
                                        marginLeft: 30,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}><Animation
                                        ref={animation => {
                                            this.complete = animation;
                                        }}
                                        style={{
                                            zIndex: 10,
                                            elevation: 10,
                                            position: 'absolute',
                                            paddingLeft: 10,
                                            width: width / 8,
                                            height: width / 8,

                                        }}
                                        resizeMode="cover"
                                        progress={this.state.progress}
                                        source={require('../assets/Lottie/done.json')}/>
                                    </View> : null}
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Cancelled')}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#fb4348',
                                    elevation: 5,
                                    marginBottom: 0
                                }}>
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: '600',
                                        marginVertical: 15,
                                        fontSize: 15
                                    }}>
                                    CANCELLATION</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </ScrollView>
            </View>

        )
            ;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Arrived);

const styles = StyleSheet.create({
    avoidingView: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        width: width,
        alignItems: 'center',
    },

    card: {
        backgroundColor: 'white',
        elevation: 1,
        width: width,
        paddingBottom: 10,
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    customerContainer: {
        paddingBottom: 20,
    },
    serviceTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#3B586E',
    },
    textLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    label: {
        fontWeight: 'bold',
        color: '#469cfc'
    },
    textInput: {
        flex: 1
    },
    completionButtonContainer: {
        paddingVertical: 20
    },
    callContainer: {
        backgroundColor: '#58B982',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
    },
    callContainerText: {
        color: 'white',
        padding: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    }

});

