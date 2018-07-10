import React from 'react';
import firebase from 'react-native-firebase';
import NavigationService from '../Helpers/NavigationService';


const authService = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();
const firestore = firebase.firestore();

const Auth = {
    current: () => {
        return new Promise(function (resolve, reject) {
            authService.onAuthStateChanged(function (user) {
                if (user) {
                    resolve(user);
                } else {

                }
            })
        })
    },
    login: (email, password) => {

        return dispatch => {
            authService.signInWithEmailAndPassword(email, password)
                .then((user) => {
                    // Success
                    console.log('success');
                    console.log(user)
                    console.log(user.additionalUserInfo.isNewUser)

                })
                .catch((error) => {
                    console.log('error');
                    console.log('Do I still access ' + email + password);
                    return authService.createUserWithEmailAndPassword(email, password)
                })
                .then((user) => {
                    console.log(user);

                }).catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
        };

    },
    register: (email, password) => {
        return authService.createUserWithEmailAndPassword(email, password);
    },
    logout: () => {
        authService.signOut();
    }
};

const getters = {
    getUser: (uid) => {
        return dispatch => {
            console.log('Getting information if isDriver');
            firestore.collection('userAdmin').doc(uid).onSnapshot(doc => {
                if (!doc.exists) {
                    return null
                } else {
                    if (doc.data().isDriver) {
                        NavigationService.navigate('Home');
                    }
                    console.log('Document data:', doc.data());
                }
            })
        }
    },
    getIsOnShift: (uid) => {
        return dispatch => {
            console.log('Checking if the individual is on shift');
            console.log(uid);
            firestore.collection('drivers').doc('calgary').collection('activeDrivers').doc(uid).onSnapshot(doc => {
                console.log('what');
                if (!doc.exists) {
                    dispatch({
                        type: 'SET_DRIVER_ON_SHIFT',
                        value: false
                    });
                } else {
                    console.log('Document data:', doc.data());
                    dispatch({
                        type: 'SET_DRIVER_ON_SHIFT',
                        value: true
                    });
                }
            })
        }
    },
    getRouteInfo: (routeId) => {
        return dispatch => {
            console.log('Getting Meta on the route');
            console.log('This is the routeId: ' + routeId);
            firestore.collection('jobs').doc('calgary').collection('jobs').doc(routeId).onSnapshot(routeInfo => {
                if (!routeInfo.exists) {
                    return null;
                } else {
                    console.log('This is the RouteInfo:', routeInfo.data());
                }
                firestore.collection('users').doc(routeInfo.data().customerUid).get().then((doc) => {
                    if (!doc.exists) {
                        console.log('That users meta data does not exist!');
                        return null;
                    } else {
                        console.log('This is the customer Meta:', doc.data());
                        dispatch({
                            type: 'SET_ROUTE_INFO',
                            routeInfo: routeInfo.data(),
                            customerMeta: doc.data()
                        });
                    }
                }).catch(err => {
                    console.log('Error getting document', err);
                });
            })
        }
    },
    getOptimizedRoutes: (uid) => {
        console.log('fuck balls');
        console.log('This is the optimied Routes UID: ' + uid);
        return dispatch => {
            console.log('Get Optimized Routes');
            firestore.collection('routing').doc('calgary').collection('optimizedRoutes').doc(uid).onSnapshot(doc => {
                if (!doc.exists) {

                    console.log('no Routes');

                } else {

                    console.log('This is the optimised Routes REtrieved: ')
                    console.log(doc.data());

                    let array = [];

                    Object.keys(doc.data()).forEach((key) => {
                        console.log(doc.data()[key])
                        array.push({
                            ...doc.data()[key],
                            id: doc.id,
                        });
                    });
                    console.log(array);
                    dispatch({
                        type: 'SET_OPTIMIZED_ROUTES',
                        value: array
                    });

                }
            })
        }
    },
};
const setters = {

    setInitialUserDetails: (uid, firstName, lastName, email, phoneNumber) => {
        return dispatch => {
            firestore.collection('users').doc(uid).set({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber
                }, {merge: true})
                .then((docRef) => {
                    dispatch({
                        type: 'USER_INFO_UPDATED',
                        value: true
                    });
                });
        }
    },
};


const actions = {
    setIsOnShift: (uid) => {
        return dispatch => {
            console.log('Setting the driver on shift');
            firestore.collection('drivers').doc('calgary').collection('activeDrivers').doc(uid).set({
                id: `${uid}`,
                start_location: {
                    id: "depot",
                    lat: 51.091617,
                    lng: -113.960600
                },
                end_location: {
                    id: "depot",
                    lat: 51.091617,
                    lng: -113.960600
                }
            }).then(() => {
                dispatch({
                    type: 'SET_DRIVER_ON_SHIFT',
                    value: true
                });
            })
        }
    },
    setIsOffShift: (uid) => {
        console.log(uid);
        return dispatch => {
            console.log('Setting the driver OFF shift');
            firestore.collection('drivers').doc('calgary').collection('activeDrivers').doc(uid).delete().then(() => {
                dispatch({
                    type: 'SET_DRIVER_ON_SHIFT',
                    value: false
                });
            })
        }
    },
    sendFeedback: (uid, feedback) => {
        return dispatch => {
            firestore.collection('feedback').add({
                    uid: uid,
                    feedback: feedback,
                    timestamp: Date.now()
                })
                .then((docRef) => {
                    console.log(docRef);
                    NavigationService.navigate('Home');

                });
        }
    },
    takeJob: (uid) => {
        return dispatch => {
            return fetch('https://us-central1-surefuelapp.cloudfunctions.net/acceptNextAvailable', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    driver_uid: uid
                })
            }).then((response => console.log(response)))
        }
    }

};


export default {
    Auth,
    getters,
    setters,
    actions
};

