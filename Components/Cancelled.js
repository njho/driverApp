import React from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    Image,
    Text,
    TextInput,
    View,
    Alert,
    Button,
    TouchableOpacity,
    Switch,
    Dimensions,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ListItem, List} from 'react-native-elements';
import {connect} from 'react-redux';

import agent from './Helpers/agent';
import CustomerInfo from './CustomerInfo';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const list = [
    {
        title: 'Gas Cap Locked',
        type: 'gasCap',
        avatar_url: require('../assets/windshield.png'),
    },
    {
        title: 'Wrong Address',
        type: 'address',
        avatar_url: require('../assets/tiregauge.png'),
    },
    {
        title: 'Other',
        type: 'other',
        avatar_url: require('../assets/topup.png'),
    },
];

const mapStateToProps = state => ({
    optimizedRoutes: state.routing.optimizedRoutes,
    routeInfo: state.routing.routeInfo,

    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({

    confirmCancellation: (object, jobId) => {
        dispatch(agent.actions.confirmCancellation(object, jobId));
    },
    takeJob: (uid) => {
        dispatch(agent.actions.takeJob(uid))
    }
});


class Cancelled extends React.Component {
    constructor() {
        super();
        this.state = {
            gasCap: false,
            address: false,
            other: false,
            feedback: '',
            type: 'driver'

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
    };

    toggleSwitch(value) {
        console.log(value);
        switch (value) {
            case 'gasCap':
                this.setState({...this.state, gasCap: !this.state.gasCap});
                return;
            case 'address':
                this.setState({...this.state, address: !this.state.address});
                return;
            case 'other':
                this.setState({...this.state, other: !this.state.other});
                return;
        }
    }

    textHandler(text) {
        console.log(text);
        this.setState({...this.state, feedback: text})
    }

    confirmCancellation = () => {

        if (!this.state.gasCap && !this.state.address && !this.state.other || (this.state.feedback === '' && this.state.other === true )) {
            Alert.alert(
                'Confirm Cancellation',
                'Please ensure that at least one switch is selected, and that a description is completed.',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {
                        text: 'OK',
                        onPress: () => {this.props.confirmCancellation(this.state, this.props.routeInfo.routeId)}
                    },
                ],
                {cancelable: false}
            )
        } else {
            console.log('this.props.routeinfo' + this.props.routeInfo);
            console.log(this.props.routeInfo);
            console.log(this.props.routeInfo.routeId);
            this.props.takeJob(this.props.user.uid);
            this.props.confirmCancellation({
                ...this.state
            }, this.props.routeInfo.routeId)
        }


    };


    render() {
        return (
            <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.avoidingView}
                                  contentContainerStyle={{paddingBottom: 5}} enabled>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <CustomerInfo/>
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
                                        switched={this.state[item.type]}
                                        onSwitch={() => this.toggleSwitch(item.type)}

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
                                    placeholder={'Additional Notes'}
                                    value={this.state.feedback}
                                    onChangeText={(text) => this.textHandler(text)}
                                />
                            </View>

                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.confirmCancellation()}

                        style={{
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

export default connect(mapStateToProps, mapDispatchToProps)(Cancelled);


const styles = StyleSheet.create({
    avoidingView: {
        flex: 1,
        backgroundColor: 'white'
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

