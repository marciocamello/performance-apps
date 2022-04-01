import React, { memo } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import lodash from 'lodash';

type Props = {
    data: {
        id: number;
        name: string;
        likes: number;
        follow: boolean;
    };
    follow: (id: number) => void;
}

function FriendComponent({ data, follow }: Props) {
    return (
        <View style={styles.container}>
            <Text>
                {data.name} - Likes: {data.likes}
            </Text>

            <TouchableOpacity
                onPress={() => follow(data.id)}
                style={styles.follow}
            >
                <Text style={styles.followText}>
                    {data.follow ? 'Noflow' : 'Follow'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

// only use memo if a pure component or a big components
export const Friend = memo(FriendComponent, (prepProps, nextProps) => {
    return lodash.isEqual(prepProps.data, nextProps.data);
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    follow: {
        backgroundColor: '#7159c1',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    followText: {
        color: '#fff',
    }
});