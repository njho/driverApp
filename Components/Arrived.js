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
    ScrollView,
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
        title: 'Customer Completion',
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
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{alignItems: 'center'}}
                    style={{
                        width: width,
                    }}>
                    <View style={styles.card}>
                        <View style={styles.customerContainer}>
                            <Text style={styles.customer}>
                                Jill Jillenhall </Text>
                            <Text>
                                45 Broadmoor Avenue SW, Calgary
                            </Text>
                            <Text>
                                Red Acura NSX </Text>
                            <Text>
                                BNN-2260</Text>
                            <Text>
                                Regular 87 - 650 Litres</Text>

                            <TextInput
                                style={styles.textInput}
                                underlineColorAndroid='rgba(250,250,250,1)'
                                autofocus={'true'}
                                keyboardType={'numeric'}
                                placeholder={'Fuel Quantity (Required)'}/>
                            <TextInput
                                style={styles.textInput}
                                underlineColorAndroid='rgba(250,250,250,1)'
                                placeholder={'Additional Notes'}/>
                            <Text style={styles.customer}>
                                Services Rendered </Text>

                        </View>
                    </View>

                    <TouchableOpacity style={{
                        borderRadius: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: width * 0.7,
                        backgroundColor: '#469cfc',
                        marginBottom: 40,
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
        alignItems: 'center'
    },
    card: {
        backgroundColor: 'white',
        elevation: 5,
        width: width * 0.9,
        borderRadius: 5,
        marginTop: 30,
        padding: 30,
    },
    customerContainer: {
        paddingBottom: 20,
    },
    customer: {
        fontSize: 20,
        fontWeight: 'bold'
    },

});

