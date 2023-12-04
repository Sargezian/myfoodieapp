import { Pressable, StyleSheet, Text, View } from 'react-native';

function Button({ children, onPress }) {
    return (
        <Pressable
            style={({ pressed }) => [styles.formAction, pressed && styles.pressed]}
            onPress={onPress}
        >
            <View style={styles.formAction}>
                <View style={styles.btn}>
                <Text style={styles.buttonText}>{children}</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
    formAction: {
        marginVertical: 24,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#d36d6c',
        borderColor: '#d36d6c',
    },
});