import React, { useMemo } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Friend } from './Friend';

type Props = {
    data: {
        id: number;
        name: string;
        likes: number;
        follow: boolean;
    }[];
    follow: (id: number) => void;
}


export function FriendsList({ data, follow }: Props) {

    // only use useMemo if need to hard calculate and change the values
    const totalLikes = useMemo(() => {
        return data.reduce((acc, curr) => acc + curr.likes, 0);
    }, [data]);

    return <View>
        <Text style={styles.likes}>Total likes: {totalLikes}</Text>
        {
            <FlatList
                data={data}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <Friend data={item} follow={follow} />}
            />
        }
    </View>;
}

const styles = StyleSheet.create({
    likes: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    }
});