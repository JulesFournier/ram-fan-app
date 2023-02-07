import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import HomeScreen from "./src/components/screens/HomeScreen";
import DetailsScreen from "./src/components/screens/DetailsScreen";
import {MD3LightTheme as DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import 'cross-fetch/polyfill';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'magenta',
        secondary: 'yellow',
    },
};

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
});

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <PaperProvider theme={theme}>
            <ApolloProvider client={client}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Details" component={DetailsScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ApolloProvider>
        </PaperProvider>
    );
}

export default App;
