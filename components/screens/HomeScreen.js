import {StyleSheet, FlatList, Text, View, ActivityIndicator} from "react-native";
import * as React from "react";
import {useQuery, refetch} from "@apollo/client";
import ApplicationConf from "../../gql/ApplicationConf";
import CharacterItem from "../Items/CharacterItem";
import BottomBar from "../Appbars/BottomBar";
import {useEffect, useState} from "react";

const HomeScreen = ({ navigation }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data, refetch } = useQuery(ApplicationConf.characters.getByPage(currentPage));

    useEffect(() => {
        refetch(ApplicationConf.characters.getByPage(currentPage))
    }, [currentPage])

    const currentPageHandler = (isPageUp) => isPageUp ? setCurrentPage(currentPage + 1) : setCurrentPage(currentPage - 1)

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator style={{ flex: 5.5, width: "100%" }} animating={true} size={100}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 5.5, width: "100%" }}>
                <FlatList
                    data={data.characters.results}
                    renderItem={
                        ({ item }) =>
                            <CharacterItem
                                character={item}
                                navigation={navigation}
                            />
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
            <View style={{ flex: 0.5, width: "100%" }}>
                <BottomBar currentPageHandler={currentPageHandler} currentPage={currentPage} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    contained: {
        flex: 5.5,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    }
});

export default HomeScreen
