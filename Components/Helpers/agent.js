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
    getRouteInfo: (routeId, uid) => {
        return dispatch => {
            console.log('Getting Meta on the route');
            console.log('This is the routeId: ' + routeId);
            firestore.collection('jobs').doc('calgary').collection('jobs').doc(routeId).onSnapshot(routeInfo => {
                if (!routeInfo.exists) {
                    return null;
                } else {
                    console.log('This is the RouteInfo:', routeInfo.data());
                }

                if (routeInfo.data().cancelled === true) {
                    console.log('The job has been cancelled');
                    dispatch(actions.takeJob(uid));

                } else {
                    firestore.collection('users').doc(routeInfo.data().customerUid).get().then((doc) => {
                        if (!doc.exists) {
                            console.log('That users meta data does not exist!');
                            return null;
                        } else {
                            console.log('This is the route Meta:', doc.data());
                            let newRouteInfo = routeInfo.data();
                            newRouteInfo.routeId = routeInfo.id;

                            console.log(newRouteInfo);


                            dispatch({
                                type: 'SET_ROUTE_INFO',
                                routeInfo: newRouteInfo,
                                customerMeta: doc.data()
                            });
                        }
                    }).catch(err => {
                        console.log('Error getting document', err);
                    });
                }
            })
        }
    },
    getAcceptedJob: (uid) => {
        return dispatch => {
            console.log('Getting the job this driver has currently accepted on the route driverUid' + uid);

            firestore.collection('routing').doc('calgary').collection('acceptedJobs').doc(uid).onSnapshot(doc => {
                if (!doc.exists) {
                    dispatch({
                        type: 'SET_ACCEPTED_JOB',
                        value: '',
                    });

                    return null;
                } else {
                    console.log('This is the acceptedJob:', doc.data());
                    dispatch(getters.getRouteInfo(doc.data().location_id, uid));

                    dispatch({
                        type: 'SET_ACCEPTED_JOB',
                        value: doc.data().location_name,
                    });

                }


            })
        }
    },
    getAcceptedJobMeta: (job) => {
        return dispatch => {
            console.log('GETTING THE ACCEPTED JOB META ' + job);

            firestore.collection('jobs').doc('calgary').collection('jobs').doc(job).onSnapshot(doc => {
                if (!doc.exists) {
                    return null;
                } else {
                    console.log('This is the acceptedJobMeta:', doc.data());

                    dispatch({
                        type: 'SET_ACCEPTED_JOB_META',
                        value: doc.data(),
                    });
                }


            })
        }
    },
    getOptimizedRoutes: (uid) => {
        return dispatch => {
            console.log('Get Optimized Routes');
            firestore.collection('routing').doc('calgary').collection('optimizedRoutes').doc(uid).onSnapshot(doc => {
                if (!doc.exists) {

                    console.log('no Routes');

                } else {

                    console.log('This is the optimised Routes REtrieved: ');
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
    takeJob: (uid, navigate) => {
        console.log('Take Job 1');
        console.log(uid);

        return dispatch => {
            console.log('Take Job');
            return fetch('https://us-central1-surefuelapp.cloudfunctions.net/acceptNextAvailable', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    driver_uid: uid
                })
            }).then((response => {
                if (navigate) {
                    NavigationService.navigate('Home');

                }
                console.log(response)
            }))
        }
    },
    forceLogout: (uid, jobId, logout) => {
        console.log('Take Job 1');
        console.log(uid);
        console.log(jobId);

        return dispatch => {
            console.log('Force Log the bitch out');
            return fetch('https://us-central1-surefuelapp.cloudfunctions.net/removeDriverActiveJob', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    driver_uid: uid,
                    job_id: jobId
                })
            }).then((response => {
                console.log(response);
                dispatch({
                    type: 'SET_DRIVER_ON_SHIFT',
                    value: false
                });

                if (logout) {
                    firebase.auth().signOut().then(() => NavigationService.navigate('Loading')
                    );
                }
            }))
        }
    },
    confirmCancellation: (object, jobId) => {
        console.log('A cancellation has been triggered');
        console.log(object);
        console.log(jobId);
        return dispatch => {
            firestore.collection('jobs').doc('calgary').collection('jobs').doc(jobId).set({
                    cancellation: object,
                    cancelled: true
                }, {merge: true})
                .then((docRef) => {
                    console.log(docRef);
                    NavigationService.navigate('Home');

                });
        }
    },
    confirmCompletion: (jobId, object, uid) => {
        console.log('The job has been completed!');
        console.log(jobId);
        console.log(object);

        return dispatch => {
            firestore.collection('jobs').doc('calgary').collection('jobs').doc(jobId).set({
                    completion: object,
                }, {merge: true})
                .then((docRef) => {
                    console.log(docRef);
                    dispatch(actions.takeJob(uid, true));


                });
        }
    },
    setIsOffShift: (uid, logout) => {
        console.log(uid);
        return dispatch => {
            console.log('Setting the driver OFF shift');
            firestore.collection('drivers').doc('calgary').collection('activeDrivers').doc(uid).delete().then(() => {
                dispatch({
                    type: 'SET_DRIVER_ON_SHIFT',
                    value: false
                });

                if (logout) {
                    firebase.auth().signOut().then(() =>  NavigationService.navigate('Loading'));
                }
            })
        }
    },

    dispatchEmergency: (uid, emergencyText, state, jobId) => {
        console.log('An Emergency has been dispatched to dispatch. Taking the driver offline');
        return dispatch => {


            //ORDERED IN THIS WAY TO HELP PREVENT COLLISSIONS WITH FIREBASE CLOUD FUNCTIONS => IF DRIVER IS NOT REMOVED
            //FROM ROUTIFIC QUEUE, AND A RE-OPTIMIZE IS TRIGGERED, HE WILL STILL BE IN QUEUE
            firestore.collection('drivers').doc('calgary').collection('activeDrivers').doc(uid).delete().then(() => {
                dispatch({
                    type: 'SET_DRIVER_ON_SHIFT',
                    value: false
                });
                return firestore.collection('drivers').doc('calgary').collection('emergency')
                    .add({
                        driverUid: uid,
                        emergencyText: emergencyText,
                        ...state,
                        jobId: jobId,
                        timestamp: Date.now()
                    })
            }).then(ref => {
                console.log('Added document with ID: ', ref.id);
                console.log('Take this guy offline, stat');
                NavigationService.navigate('Home');
            });
        }
    },

};


export default {
    Auth,
    getters,
    setters,
    actions
};

