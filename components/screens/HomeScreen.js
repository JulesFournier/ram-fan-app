import {FlatList, Text, View} from "react-native";
import * as React from "react";
import {useQuery} from "@apollo/client";
import ApplicationConf from "../../gql/ApplicationConf";
import CharacterItem from "../Items/CharacterItem";
import BottomBar from "../Appbars/BottomBar";

const HomeScreen = ({ navigation }) => {
    const { data, loading } = useQuery(ApplicationConf.characters.getByPage(2));

    if (loading) {
        return <Text>Fetching data...</Text>
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                style={{ width: "100%" }}
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
            <BottomBar/>
        </View>
    );
}

export default HomeScreen
