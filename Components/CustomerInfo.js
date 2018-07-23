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


const mapStateToProps = state => ({
    customerMeta: state.routing.customerMeta,
    routeInfo: state.routing.routeInfo,

});

const mapDispatchToProps = dispatch => ({});


class CustomerInfo extends React.Component {
    constructor() {
        super();
    }


    render() {

        return (
            <View style={[styles.card, {backgroundColor: '#3B586E'}]}>

                <View style={styles.customerContainer}>
                    <Icon style={{position: 'absolute', top: 0, right: 10}}
                          name="ios-information-circle-outline" size={35} color={'rgba(255,255,255,0.9)'}/>
                    <Text style={[styles.customer, {color: 'white', fontSize: 25, fontWeight: 'bold'}]}>
                        {this.props.customerMeta.firstName} {this.props.customerMeta.lastName}</Text>
                    <Text style={{color: 'white'}}>
                        Lat: {this.props.routeInfo.routing.location.lat},{"\n"}
                        Lng: {this.props.routeInfo.routing.location.lat}{"\n"}
                    </Text>
                    <Text style={{color: 'white'}}>
                        {this.props.routeInfo.vehicle.year} {this.props.routeInfo.vehicle.make} {this.props.routeInfo.vehicle.model}  </Text>
                    <Text style={{color: 'white'}}>
                        {this.props.routeInfo.vehicle.license}</Text>
                    <Text style={{color: 'white'}}>
                        {this.props.routeInfo.vehicle.octane} - 60 Litres
                    </Text>

                </View>
            </View>
        )
            ;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo);

const styles = StyleSheet.create({


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


});

