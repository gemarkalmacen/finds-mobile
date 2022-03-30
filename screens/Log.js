import React from 'react';
import {
    StyleSheet,
    View,
    Button,
    Text,
    TouchableOpacity
} from 'react-native';
import Login from "./Login";

const Log = ({ navigation }) => {
    navigation.navigate("Home");

    return (

        <View style={styles.container}>
            <Button title='Hello' onPress={() => navigation.navigate("Home")} />
            <Text>fvasd</Text>

            {/* <Text>TEV</Text> */}
        </View>
    )
}

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

export default Log;