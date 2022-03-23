import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid, Button ,Text,Image} from "react-native";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';
  GoogleSignin.configure({
    webClientId: '260611616348-3vcacvukntei9np6t218vu99v672js8u.apps.googleusercontent.com',
    offlineAccess: true, // if you want to access Google API on behalf 
  });
  class Login extends Component {
    constructor(props){
      super(props)
      this.state={
        userGoogleInfo : {},
        loaded: false
      }}
    signIn = async () => {
        try {
          console.log("Processing");
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          this.setState({
            userGoogleInfo : userInfo,
            loaded : true
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
      signOut = async () => {
        try {
          console.log("Sign out");
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          this.signIn();
        } catch (error) {
          console.log(error.message);
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
                <View>
                  <Text>{this.state.userGoogleInfo.user.name}</Text>
                  <Text>{this.state.userGoogleInfo.user.email}</Text>
                  <Image 
                style={{ width: 100, height: 100 }}
                source={{uri: this.state.userGoogleInfo.user.photo}}
              />
                </View>
              : <Text>Not SignedIn</Text> }
              <View style={{ width: 160, marginTop: 10 }}>
                <Button
                  onPress={this.signOut}
                  title="Use other account"
                  color="#24A0ED"
                  accessibilityLabel="Learn more about this primary"/>
              </View>
          </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#000000',
      padding:15,
    },
    buttons:{
        width:20
    }
  });
export default Login;


