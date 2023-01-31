import {Avatar, Button, Card} from "react-native-paper";
import * as React from "react";

const CharacterItem = ({ character, navigation }) => {
    const { name, image, status, species } = character;
    const statusDetails = {
        Alive: {
            text: "Alive",
            icon: "hospital",
            color: "green"
        },
        Dead: {
            text: "Dead",
            icon: "skull",
            color: "red"
        },
        unknown: {
            text: "Unknown",
            icon: "help",
            color: "grey"
        },
    }
    const LeftContent = props =>
        <Avatar.Icon
            {...props}
            icon={statusDetails[status].icon}
            style={{ backgroundColor: statusDetails[status].color }}
        />

    return (
        <Card style={{
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
        }}>
            <Card.Title
                title={name}
                subtitle={`${statusDetails[status].text} - ${species}`}
                left={LeftContent}
            />
            <Card.Cover
                source={{ uri: image }}
            />
            <Card.Actions>
                <Button
                    children={"Go to Details"}
                    mode={"contained"}
                    onPress={() => navigation.navigate('Details')}
                />
            </Card.Actions>
        </Card>
    );
};

export default CharacterItem
