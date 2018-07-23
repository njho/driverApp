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
    Alert,
    Dimensions
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import {ListItem, List} from 'react-native-elements';

import agent from './Helpers/agent';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const list = [
    {
        title: 'Mechanical Problems',
        short: 'mechanical'
    },
    {
        title: 'Low Supplies',
        short: 'supplies'
    },
    {
        title: 'Other',
        short: 'other'
    },
];

const mapStateToProps = state => ({
    user: state.auth.user,
    routeInfo: state.routing.routeInfo,
    emergencyText: state.common.emergencyText,
});

const mapDispatchToProps = dispatch => ({
    setEmergencyText: (value) => {
        dispatch({type: 'SET_EMERGENCY_TEXT', value: value});
    },
    dispatchEmergency: (uid, emergencyText, state, jobId) => {
        console.log('This is the state');
        console.log(state);
        dispatch(agent.actions.dispatchEmergency(uid, emergencyText, state, jobId));
    }
});


class Emergency extends React.Component {
    constructor() {
        super();
        this.state = {
            mechanical: false,
            supplies: false,
            other: false
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
    };

    toggleSwitch(value) {
        console.log(value);

        this.setState({
            ...this.state,
            [value]: !this.state[value]
        });
    }

    textHandler(text) {
        this.props.setEmergencyText(text);
    }

    componentWillUnmount() {
        this.props.setEmergencyText('');

    }

    dispatchEmergency() {
        if (this.props.emergencyText !== null && (this.state.mechanical || this.state.other || this.state.supplies)) {
            this.props.dispatchEmergency(this.props.user.uid, this.emergencyText, this.state, this.props.routeInfo.routeId)
        } else {
            Alert.alert('Please select one Toggle, and fill the text parameter');
        }
    }


    render() {
        return (
            <KeyboardAvoidingView style={styles.container}
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
                                            switched={this.state[item.short]}
                                            onSwitch={() => this.toggleSwitch(item.short)}

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
                                    value={this.props.emergencyText}
                                    placeholder={'Additional Notes Required'}
                                    onChangeText={(text) => this.textHandler(text)}
                                />
                            </View>

                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: width * 0.9,
                            backgroundColor: '#fb4348',
                            elevation: 2,
                            marginTop: 25,
                            marginBottom: 40,
                        }}
                        onPress={() => this.dispatchEmergency()}

                    >
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

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Emergency);


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
