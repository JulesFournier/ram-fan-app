import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Appbar, Button, Chip, Divider, FAB, Menu, useTheme} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useEffect, useState} from "react";
import FilterModal from "../modals/FilterModal";

const BOTTOM_APPBAR_HEIGHT = 50;
const MEDIUM_FAB_HEIGHT = 100;

const BottomBar = ({ lastPageHandler, currentPageHandler, currentPage, openModalHandler }) => {
    const { bottom } = useSafeAreaInsets();
    const theme = useTheme();

    return (
        <Appbar
            style={[
                styles.bottom,
                {
                    height: BOTTOM_APPBAR_HEIGHT + bottom,
                    backgroundColor: theme.colors.elevation.level2,
                },
            ]}
            safeAreaInsets={{ bottom }}
        >
            <Appbar.Action icon="skip-previous" onPress={() => lastPageHandler(false)} />
            <Appbar.Action icon="chevron-left" onPress={() => currentPageHandler(false)} />
            <Text children={currentPage.toString()}/>
            <Appbar.Action icon="chevron-right" onPress={() => currentPageHandler(true)} />
            <Appbar.Action icon="skip-next" onPress={() => lastPageHandler(true)} />
            <FAB
                mode="elevated"
                size="medium"
                icon="filter"
                onPress={() => openModalHandler()}
                style={[
                    styles.fab,
                    { top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },
                ]}
            />
        </Appbar>
    );
};

const styles = StyleSheet.create({
    bottom: {
        backgroundColor: 'aquamarine',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    fab: {
        position: 'absolute',
        right: 16,
    },
});

export default BottomBar;
