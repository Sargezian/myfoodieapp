import { View, Text, StyleSheet } from 'react-native';

function List({ data }) {
    return data.map((dataPoint) => (
        <View key={dataPoint} style={styles.listItem}>
            <Text style={styles.itemText}>{dataPoint}</Text>
        </View>
    ));
}

export default List;

const styles = StyleSheet.create({
    listItem: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: '#F7D4D4',
    },
    itemText: {
        color: '#000000',
        textAlign: 'center',
    },
});