import React, {Component} from 'react';
import {View, StyleSheet, Image } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import { getAuth} from 'firebase/auth';
import {ref, onValue} from 'firebase/database';
import db from '../config';

import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
export default class CustomSideBarMenu extends Component {
    cosntructor(props) {
        super(props);
        this.state = {
            light_theme: true,
        };
    }

    componentDidMount() {
        let theme;
        const auth = getAuth();
        const userId = auth.currentUser.uid;

        onValue(ref(db, '/users/' + userId), (snapshot) => {
            theme = snapshot.val().current_theme;
            this.setState({
                light_theme: theme === 'light' ? true : false,
            });
        });
    }

    render() {
        let props = this.props;
        return (
            <View
            style={{
                flex: 1,
                backgroundColor: this.state.light_theme ? 'white' : '#15193c',
            }}>
                <Image
                source={requestAnimationFrame('../assets/logo.png')}
                style={StyleSheet.sideMenuProfileIcon}></Image>
                <DrawerContentsScrollView {...props}>
                    <DrawerItemList {...props} />
                </DrawerContentsScrollView>
            </View>
        );
    }

    const styles = StyleSheet.create({
        sideMenuProfileIcon: {
            width: RFValue(140),
            height: RFValue(140),
            borderRadius: RFValue(70),
            alignSelf: 'center',
            marginTop: RFValue(60),
            resizeMode: 'contain',
        };
    });
}