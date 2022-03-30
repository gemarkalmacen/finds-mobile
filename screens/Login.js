import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid, Button, Text, Image } from "react-native";
import TouchID from 'react-native-touch-id';
import { Home } from "../screens"
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../constants';
import Log from "./Log";
GoogleSignin.configure({
  webClientId: '260611616348-3vcacvukntei9np6t218vu99v672js8u.apps.googleusercontent.com',
  offlineAccess: true, // if you want to access Google API on behalf 
});

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userGoogleInfo: {},
      loaded: false
    }
  }
  static navigationOptions = {
    title: 'Login',
  };
  signIn = async () => {
    try {
      console.log("Processing");
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({
        userGoogleInfo: userInfo,
        loaded: true
      })
      console.log(this.state.userGoogleInfo);
      console.log(this.state.userGoogleInfo.user.name)
      console.log(this.state.userGoogleInfo.user.email)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("e 1");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("e 2");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("e 3");
      } else {
        console.log(error.message);
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ width: 222, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.signIn}
        />
        {this.state.loaded ?
          <Log />
          : <Text>Not sign in</Text>}
      </View>
    );
  }
}

// function renderHeader({ navigation }) {
//   navigation.navigate('Home');
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
  },
  buttons: {
    width: 20
  }
});
export default Login;


