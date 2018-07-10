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
    Switch,
    Dimensions,
    ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {ListItem, List} from 'react-native-elements';


import firebase from 'react-native-firebase';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const list = [
    {
        title: 'Gas Cap Locked',
        avatar_url: require('../assets/windshield.png'),
        icon: 'av-timer'
    },
    {
        title: 'Wrong Address',
        avatar_url: require('../assets/tiregauge.png'),
        icon: 'flight-takeoff'
    },
    {
        title: 'Other',
        avatar_url: require('../assets/topup.png'),

        icon: 'flight-takeoff'
    },
];

export default class PersonalInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            // firebase things?
        };
    }

    static navigationOptions = {
        drawerLabel: 'Arrived',
        title: 'Job Cancellation',
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


    render() {
        return (
            <KeyboardAvoidingView style={styles.container}
                                  behavior="position"
                                  enabled>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                    <View style={styles.bottomContainer}>
                        <Text style={styles.subheader}>Why are you cancelling this delivery?</Text>

                        <List>
                            {
                                list.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        title={item.title}
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
                    <View>
                        <Text style={styles.subheader}>Please Provide Additional Details</Text>

                        <View>
                            <View style={styles.textContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    underlineColorAndroid='rgba(250,250,250,0)'
                                    textAlignVertical={'top'}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder={'Additional Notes'}/>
                            </View>

                        </View>
                    </View>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: width * 0.9,
                        backgroundColor: '#fb4348',
                        elevation: 2,
                        marginTop: 25,
                        marginBottom: 50
                    }}>
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: '600',
                                marginVertical: 15,
                                fontSize: 15
                            }}>
                            Confirm Cancellation</Text>

                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

        )
            ;
    }
}

const styles = StyleSheet.create({
    avoidingView: {
        flex: 1,
    },
    bottomContainer: {
        width: width * 0.9
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
    scrollContainer: {

        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: 'white'

    },
    // listItem: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     paddingHorizontal: 20,
    //     paddingVertical: 10,
    //     marginTop: 5,
    //     width: width * 0.9,
    //     alignItems: 'center',
    //     backgroundColor: 'rgba(255,255,255,0.4)',
    //     borderColor: '#dde1e2',
    //     borderWidth: 1,
    // },
    listItemText: {
        textAlign: 'left'
    },
    textContainer: {
        backgroundColor: 'white',
        width: width * 0.9,
        borderColor: '#c9cdce',
        borderWidth: 1,
        marginTop: 5,
        borderRadius: 2,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    subheader: {
        textAlign: 'left',
        fontSize: 18,
        marginTop: 25,
        fontWeight: 'bold',
        color: '#3B586E',
    },
    textInput: {
        flex: 1,
        alignSelf: 'flex-start'
    },


});

