import {Text, View} from "react-native";
import * as React from "react";
import {Card, Button, Avatar} from "react-native-paper";
import {statusDetails} from "../items/CharacterItem";

const DetailsScreen = ({ route, navigation }) => {
    const {
        id,
        name,
        status,
        species,
        type,
        gender,
        image,
        created
    } = route.params.character;

    const RightContent = props => <Avatar.Icon
        {...props}
        size={50}
        icon={statusDetails[status].icon}
        style={{ backgroundColor: statusDetails[status].color }}
    />

    return (
        <View style={{ margin: 15 }}>
            <Card.Title
                title={name}
                titleStyle={{ fontSize: 20, fontWeight: "bold"}}
                subtitle={species}
                subtitleStyle={{ fontSize: 18}}
                right={RightContent} />
            <Card.Content>
                <Text style={{ textTransform: 'capitalize', fontSize: 15 }} variant="titleLarge">{`Status: ${status}`}</Text>
                <Text style={{ textTransform: 'capitalize', margin: 10 }} variant="bodyMedium">{`Type: ${type}`}</Text>
            </Card.Content>
            <Card.Cover style={{ height: "70%" }} source={{ uri: image }} />
            <Card.Actions>
                <Button onPress={() => navigation.goBack()}>Go back</Button>
            </Card.Actions>
        </View>
    );
}

export default DetailsScreen
