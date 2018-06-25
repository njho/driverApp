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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {ListItem, CheckBox} from 'react-native-elements';


import firebase from 'react-native-firebase';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class PersonalInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            // firebase things?
        };
    }

    static navigationOptions = {
        drawerLabel: 'Arrived',
        title: 'Cancellation',
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
                                  contentContainerStyle={{height: height}} behavior="position"
                                  enabled>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Icon name="ios-warning" size={60} color={'#fb624c'}/>

                    <View>
                        <Text style={styles.subheader}>We're here to help.</Text>
                        <Text style={{paddingBottom: 5}}>Our dispatcher will be with you
                            shortly</Text>
                        <View
                            style={styles.listContainer}>
                            <View style={styles.listItem}>
                                <Text style={styles.listItemText}>
                                    Mechanical Problems
                                </Text>
                                <Switch></Switch>
                            </View>

                            <View style={styles.listItem}>
                                <Text style={styles.listItemText}>
                                    Low Supplies
                                </Text>
                                <Switch></Switch>
                            </View>
                            <View style={styles.listItem}>
                                <Text style={styles.listItemText}>
                                    Other </Text>
                                <Switch></Switch>
                            </View>

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
                        borderRadius: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: width * 0.9,
                        backgroundColor: '#fb4348',
                        elevation: 2,
                        marginBottom: 0,
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
        flex: 1,
        padding: 40,
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'space-around'

    },
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        justifyContent: 'space-around'

    },
    listContainer: {},
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
        fontWeight: 'bold',
        textAlign: 'left'
    },
    textInput: {
        flex: 1,
        alignSelf: 'flex-start'

    }

});
