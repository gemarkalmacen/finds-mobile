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
import { dummyData, COLORS, SIZES, FONTS, icons, images} from '../constants';

const Home = ({ navigation }) => {

    const [trending, setTrending] = React.useState(dummyData.trendingCurrencies)
    const [transactionHistory, setTransactionHistory] = React.useState(dummyData.transactionHistory)

    React.useEffect(()=>{
        LogBox.ignoreLogs(['Found screens with the same name nested'])
        LogBox.ignoreLogs(['Bottom Tab Navigator:'])
        LogBox.ignoreLogs(['[react-native-gesture-handler]'])
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    }, [])


    function renderHeader(){

        const renderItem = ({item, index}) =>(
            <TouchableOpacity
                style={{
                    width:155,
                    paddingVertical:SIZES.padding,
                    paddingHorizontal:SIZES.padding,
                    marginLeft: index == 0 ? SIZES.padding : 0,
                    marginRight: SIZES.radius,
                    borderRadius: 15,
                    backgroundColor: COLORS.white  
                }}
                onPress={() => navigation.navigate("CryptoDetail", {currency:item})}
                
            >
                {/* Currency*/}
                <View style={{ flexDirection:'row'}}>
                    <View>
                        <Image
                            source={item.image}
                            resizeMode="cover"
                            style={{
                                marginTop: 5,
                                width: 25,
                                height: 25
                            }}
                        />
                    </View>
                    <View style={{marginLeft: SIZES.base}}>
                        <Text style={{...FONTS.h3}}>{item.currency}</Text>
                        <Text style={{ color:COLORS.gray, ...FONTS.body3 }}></Text>
                    </View>
                </View>
                {/* value*/}
                {/* <View style={{ marginTop:SIZES.radius}}> */}
                    {/* <Text style={{...FONTS.h6}}>₱{item.amount}</Text> */}
                    {/* <Text style={{color: item.type =="I" ? COLORS.green : COLORS.red, ...FONTS.h5}}>₱{item.amount}</Text> */}

                {/* </View> */}
            </TouchableOpacity>
            
        )
        return(
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
                        alignItems:'center'
                    }}
                >
                    {/* Header Bar */}
                    <View
                        style={{
                            marginTop:SIZES.padding *1,
                            width: "100%",
                            alignItems: "flex-end",
                            paddingHorizontal: SIZES.padding
                        }}
                    >
                        <TouchableOpacity
                        
                            style={{
                                width: 20,
                                height: 20,
                                alignItems: "center",
                                justifyContent:"center"
                            }}
                            
                            onPress={() => console.log("Notification on pressed")}
                        >
                            <Image
                                source={icons.notification_white}
                                resizeMode="contain"
                                style={{flex: 1}}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* Balance */}
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent:'center'
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h3}}>Available Balance</Text>
                        <Text style={{ marginTop:SIZES.base, color:COLORS.white, ...FONTS.h2}}>₱{dummyData.portfolio.balance}</Text>
                        <Text style={{color:COLORS.white, ...FONTS.body5}}>{dummyData.portfolio.changes} Last 24 hours</Text>
                    </View>
                    {/* Trending */}
                    <View
                        style={{
                            position:'absolute',
                            bottom: "-30%"
                        }}
                        >
                            <Text style={{ marginLeft:SIZES.padding,
                            color: COLORS.white, ...FONTS.h3 }}>Dashboard</Text>
                            <FlatList
                                contentContainerStyle={{marginTop:SIZES.base}}
                                data={trending}
                                renderItem={renderItem}
                                keyExtractor={item => `${item.id}`}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />

                    </View>
                </ImageBackground>
            </View>
        )
    }
    function renderAlert(){
        return (
            <PriceAlert/>
        )
    }
    function renderNotice(){
        return (
            <View
                style={{
                    marginTop:SIZES.padding-6,
                    marginHorizontal: SIZES.padding,
                    padding: 12,
                    borderRadius:SIZES.radius,
                    backgroundColor:COLORS.secondary,
                    ...styles.shadow
                }}
            >
                <Text style={{color:COLORS.white, ...FONTS.h4}}>Announcement:</Text>
                <Text style={{marginTop:SIZES.base, color:COLORS.white, ...FONTS.body4, lineHeight:18}}>We offer you an application to guide and track your data.
                    Learn how to use this application by reading instructions and guide.
                </Text>

                <TouchableOpacity
                    style={{
                        marginTop:SIZES.base
                    }}
                    onPress={()=> console.log("Learn More")}
                >
                    <Text style={{ textDecorationLine: 'underline',
                    color:COLORS.green, ...FONTS.h4}}>Learn more
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderTransactionHistory(){
        return (
            <TransactionHistory
                customContainerStyle={{ ...styles.shadow}}
                history={transactionHistory}
            
            />
        )
    }
    return (
        <ScrollView>
            <View style={{ flex:1, paddingBottom:130 }}>
                {renderHeader()}
                {renderAlert()}
                {renderNotice()}
                {renderTransactionHistory()}

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default Home;