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
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {ListItem, List,} from 'react-native-elements';


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


export default class Arrived extends React.Component {
    constructor() {
        super();
        this.state = {
            // firebase things?
            isOn: true,
            windshieldOn: true
        };
    }

    static navigationOptions = {
        drawerLabel: 'Arrived',
        title: 'Customer Completion',
        backgroundColor: 'red',
        headerStyle: {
            backgroundColor: '#E8442E',
        },
        headerTintColor: 'white'

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
        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{alignItems: 'center'}}
                    style={{
                        width: width,
                    }}>
                    <View style={[styles.card, {    backgroundColor: '#3B586E'}]}>
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
                                Regular 87 - 650 Litres
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
                            <TouchableOpacity style={{
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
                                        fontSize: 15
                                    }}>
                                    CONFIRM COMPLETION</Text>
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

