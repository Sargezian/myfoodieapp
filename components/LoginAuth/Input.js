import {View, Text, TextInput, StyleSheet, Platform} from 'react-native';

import COLORS from "../../constants/colors";

function Input({
                   label,
                   keyboardType,
                   secure,
                   onUpdateValue,
                   value,
                   isInvalid,
               }) {
    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
                {label}
            </Text>
            <TextInput
                style={[styles.input, isInvalid && styles.inputInvalid]}
                autoCapitalize={false}
                autoCapitalize="none"
                keyboardType={keyboardType}
                secureTextEntry={secure}
                onChangeText={onUpdateValue}
                value={value}
            />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 8,

    },
    label: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },
    labelInvalid: {
        color: COLORS.error500,
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        fontSize: 16,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: COLORS.white,
        shadowColor: 'black',
        shadowOpacity: 0.10,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    inputInvalid: {
        backgroundColor: COLORS.error100,
    },
});