import {StyleSheet, FlatList, Text, View, ActivityIndicator} from "react-native";
import * as React from "react";
import {useQuery, refetch, gql} from "@apollo/client";
import ApplicationConf from "../../gql/ApplicationConf";
import CharacterItem from "../Items/CharacterItem";
import BottomBar from "../Appbars/BottomBar";
import {useEffect, useState} from "react";
import FilterModal from "../Modals/FilterModal";

const CHARACTERS_QUERY = gql`
    query GetCharactersByPage($pageNb: Int!, $genderFilter: String, $statusFilter: String) {
        characters(page: $pageNb, filter: { gender: $genderFilter, status: $statusFilter }) {
            info {
                count
                pages
                next
                prev
            }
            results {
                id
                name
                status
                species
                type
                gender
                image
                created
            }
        }
    }
`

const HomeScreen = ({ navigation }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState({ gender: "", status: "" });
    const [modalOpen, setModalOpen] = useState(false);
    const { loading, error, data, refetch } = useQuery(CHARACTERS_QUERY, {
        variables:
            {
                pageNb: currentPage,
                statusFilter: filter.status,
                genderFilter: filter.gender
            }
    });

    useEffect(() => {
        refetch(CHARACTERS_QUERY).then()
    }, [currentPage, filter.status, filter.gender])

    const currentPageHandler = (isPageUp) => {
        const newPageNb = isPageUp ? currentPage + 1 : currentPage - 1
        if (newPageNb <= 0)
            setCurrentPage(1)
        else if (newPageNb >= data.characters.info.pages)
            setCurrentPage(data.characters.info.pages)
        else
            setCurrentPage(newPageNb)
    }

    const openModalHandler = () => {
        setModalOpen(true)
    }

    const closeModalHandler = () => {
        setModalOpen(false)
    }

    const filterStatusHandler = (value) => {
        setFilter({ gender: filter.gender, status: value })
        setCurrentPage(1)
    }

    const filterGenderHandler = (value) => {
        setFilter({ gender: value, status: filter.status })
        setCurrentPage(1)
    }

    const lastPageHandler = (isLastPageUp) => {
        if (isLastPageUp)
            setCurrentPage(data.characters.info.pages)
        else
            setCurrentPage(1)
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator style={{ flex: 5.5, width: "100%" }} animating={true} size={100}/>
                <View style={{ flex: 0.5, width: "100%" }}>
                    <BottomBar
                        lastPageHandler={lastPageHandler}
                        currentPageHandler={currentPageHandler}
                        currentPage={currentPage}
                        openModalHandler={openModalHandler}
                    />
                </View>
                <FilterModal
                    modalOpen={modalOpen}
                    closeModal={closeModalHandler}
                    filter={filter}
                    filterGenderHandler={filterGenderHandler}
                    filterStatusHandler={filterStatusHandler}
                />
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
                <BottomBar
                    lastPageHandler={lastPageHandler}
                    currentPageHandler={currentPageHandler}
                    currentPage={currentPage}
                    openModalHandler={openModalHandler}
                />
            </View>
            <FilterModal
                modalOpen={modalOpen}
                closeModal={closeModalHandler}
                filter={filter}
                filterGenderHandler={filterGenderHandler}
                filterStatusHandler={filterStatusHandler}
            />
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
