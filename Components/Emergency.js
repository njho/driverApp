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
    ScrollView,
    TouchableOpacity,
    Switch,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ListItem, List} from 'react-native-elements';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const list = [
    {
        title: 'Mechanical Problems',
        icon: 'av-timer'
    },
    {
        title: 'Low Supplies',
        icon: 'flight-takeoff'
    },
    {
        title: 'Other',
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
        drawerLabel: 'Emergency',
        title: 'Contact Dispatch & Go Offline',
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
                    <Icon name="ios-warning" size={80} color={'#fb624c'}/>

                    <View style={{width: width * 0.9}}>
                        <Text style={styles.subheader}>We're here to help.</Text>
                        <Text style={{paddingBottom: 5}}>Our dispatcher will be with you
                            shortly. Please describe your issue.</Text>
                        <View style={styles.listContainer}
                        >
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
                    </View>
                    <View>
                        <Text style={styles.subheader}>Any Further Details?</Text>

                        <View
                            style={styles.listContainer}>
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
                        marginBottom: 40,
                    }}>
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: '600',
                                marginVertical: 15,
                                fontSize: 15
                            }}>
                            Send
                        </Text>

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
    scrollContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
paddingTop: 20,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-around'

    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 5,
        width: width * 0.9,
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderColor: '#dde1e2',
        borderWidth: 1,
    },
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
    listContainer: {
        width: width * 0.9
    }

});
