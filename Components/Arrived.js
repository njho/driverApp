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
    TouchableOpacity, Switch,
    ScrollView,
    Animated,
    Dimensions
} from 'react-native';
import Animation from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ListItem, List,} from 'react-native-elements';
import {connect} from 'react-redux';


import firebase from 'react-native-firebase';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const list = [
    {
        title: 'Windshield Chip Repair',
        avatar_url: require('../assets/windshield.png'),
        icon: 'av-timer'
    },
    {
        title: 'Tire Pressure Check',
        avatar_url: require('../assets/tiregauge.png'),
        icon: 'flight-takeoff'
    },
    {
        title: 'Fluid Top Up',
        avatar_url: require('../assets/topup.png'),

        icon: 'flight-takeoff'
    },
];

const mapStateToProps = state => ({
    optimizedRoutes: state.routing.optimizedRoutes,
    routeInfo: state.routing.routeInfo,

    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    getRouteInfo: (jobId) => {
        dispatch(agent.getters.getRouteInfo(jobId));
    },
});


class Arrived extends React.Component {
    constructor() {
        super();
        this.state = {
            // firebase things?
            isOn: true,
            windshieldOn: true,
            progress: new Animated.Value(0),
            animationVisible: false
        };
    }


    completionButton = () => {
        this.setState({
            ...this.state,
            animationVisible: true
        });

        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 3000,
        }).start(() => {
            return
        });
        this.props.takeJob(this.props.user.uid);
    };

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

        // headerLeft: (
        //     <TouchableOpacity
        //         onPress={()=>this.props.navigation.navigate('Home')}
        //         style={{paddingLeft: 20}}
        //     >
        //         <Icon name="ios-arrow-back" size={40}/>
        //     </TouchableOpacity>),
        // drawerIcon: ({tintColor}) => (
        //     <Icon name="ios-mail" size={25} color={tintColor}/>
        // ),

    };

    toggleSwitch(value) {
        switch (value) {
            case 'windshield':
                this.setState({...this.state, windshieldOn: !this.state.windshieldOn});
                return;
            case 'fluids':
                this.setState({...this.state, fluidsOn: !this.state.fluidsOn})
                return;
            case 'chip':
                this.setState({...this.state, chipOn: !this.state.chipOn})
                return;


        }
    }


    render() {
        console.log('These are the optimizedRoutes');
        console.log(this.props.optimizedRoutes);
        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{alignItems: 'center'}}
                    style={{
                        width: width,
                    }}>
                    <View style={[styles.card, {backgroundColor: '#3B586E'}]}>

                        <View style={styles.customerContainer}>
                            <Icon style={{position: 'absolute', top: 0, right: 10}}
                                  name="ios-information-circle-outline" size={35} color={'rgba(255,255,255,0.9)'}/>
                            <Text style={[styles.customer, {color: 'white', fontSize: 25, fontWeight: 'bold'}]}>
                                Jill Jillenhall </Text>
                            <Text style={{color: 'white'}}>
                                45 Broadmoor Avenue SW, Calgary
                            </Text>
                            <Text style={{color: 'white'}}>
                                Red Acura NSX </Text>
                            <Text style={{color: 'white'}}>
                                BNN-2260</Text>
                            <Text style={{color: 'white'}}>
                                Regular 87 - 60 Litres
                            </Text>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.serviceTitle}>
                            SERVICE CHECKOUT </Text>
                        <View style={styles.textLabel}>
                            <TextInput
                                style={styles.textInput}
                                underlineColorAndroid='rgba(250,250,250,1)'
                                autofocus={'true'}
                                keyboardType={'numeric'}
                                placeholder={'Fuel Quantity (Required)'}/>
                            <Text style={styles.label}>60 L</Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            underlineColorAndroid='rgba(250,250,250,1)'
                            placeholder={'Additional Notes'}/>

                        <View style={{paddingTop: 20}}>
                            <Text style={[styles.serviceTitle]}>
                                ADDITIONAL SERVICES </Text>
                            <List>
                                {
                                    list.map((item, i) => (
                                        <ListItem
                                            key={i}
                                            title={item.title}
                                            roundAvatar
                                            avatar={item.avatar_url}
                                            hideChevron={true}
                                            switchButton
                                            switchOnTintColor={'#9eb7f0'}
                                            switchThumbTintColor={'#469cfc'}
                                            switched={this.state.windshieldOn}
                                            onSwitch={() => this.toggleSwitch('windshield')}

                                        />
                                    ))
                                }
                            </List>
                        </View>

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
                            <TouchableOpacity style={{
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
    }

});

