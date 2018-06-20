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
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { ListItem, CheckBox } from 'react-native-elements';


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
        header: null,
        drawerLabel: 'Emergency',
        drawerIcon: ({tintColor}) => (
            <Icon name="ios-mail" size={25} color={tintColor}/>

        ),

    };


    render() {
        return (
            <View style={styles.container}>
                <ListItem
                    title={
                        <CheckBox
                            title="Tire Flat"
                            onPress={this.press}
                            checked={this.state.checked}
                        />
                    }
                />
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
    },

});

