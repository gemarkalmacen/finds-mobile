import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    LogBox
} from 'react-native';

import { PriceAlert, TransactionHistory } from "../components"
import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../constants';

const Login = ({ navigation }) => {




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



    function renderHeader() {
        return (
            <View
                style={{
                    width: "100%",
                    height: 210,
                    ...styles.shadow
                }}
            >
                <ImageBackground
                    source={images.banner}
                    resizeMode="cover"
                    style={{
                        flex: 1,
                        alignItems: 'center'
                    }}
                >
                </ImageBackground>
            </View>
        );
    }

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
                        source={{ uri: this.state.userGoogleInfo.user.photo }}
                    />
                </View>
                : <Text>Not SignedIn</Text>}
            <View style={{ width: 160, marginTop: 10 }}>
                <Button
                    onPress={this.signOut}
                    title="Use other account"
                    color="#24A0ED"
                    accessibilityLabel="Learn more about this primary" />
            </View>
            <View style={{ width: 160, marginTop: 10 }}>
                <Button
                    onPress={this.biometric}
                    title="Fingerprint"
                    color="#24A0ED"
                    accessibilityLabel="Learn more about this primary" />
            </View>
        </View>

        //       <ScrollView>
        //     <View style={{ flex: 1, paddingBottom: 130 }}>
        //         <Text>fas</Text>

        //     </View>
        // </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        padding: 15,
    },
    buttons: {
        width: 20
    }
});

export default Login;