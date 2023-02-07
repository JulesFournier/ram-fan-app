import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip, Divider, Modal, Portal, RadioButton, Title} from 'react-native-paper';

const FilterModal = ({ modalOpen, closeModal, filter, filterGenderHandler, filterStatusHandler }) => {
    const [value, setValue] = useState('first');
    const genders = [
        "male",
        "female",
        "genderless",
        "unknown",
        ""
    ]
    const status = [
        "alive",
        "dead",
        "unknown",
        ""
    ]

    return (
        <Portal>
            <Modal visible={modalOpen} dissmissable onDismiss={() => closeModal()} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
                <Title>Status</Title>
                <RadioButton.Group onValueChange={value => filterStatusHandler(value)} value={filter.status}>
                    {status.map(g => <RadioButton.Item label={g} value={g} />)}
                </RadioButton.Group>
                <Divider bold style={{ margin: 10 }}/>
                <Title>Gender</Title>
                <RadioButton.Group onValueChange={value => filterGenderHandler(value)} value={filter.gender}>
                    {genders.map(g => <RadioButton.Item label={g} value={g} />)}
                </RadioButton.Group>
            </Modal>
        </Portal>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    contained: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
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

export default FilterModal;
