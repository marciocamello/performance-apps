import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import api from '../api/api';
import { FriendsList } from '../components/FriendsList';

type Friend = {
    id: number;
    name: string;
    likes: number;
    follow: boolean;
}

export function Home() {
    const [name, setName] = useState('');
    const [friends, setFriends] = useState<Friend[]>([] as Friend[]);
    const [loading, setLoading] = useState(false);

    async function handleSearch() {
        setLoading(true);

        api.get(`/friends?q=${name.toLocaleLowerCase()}`)
            .then(async ({ data }) => {
                setFriends(data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // use only to avoid duplicate function in memory
    const handleFollow = async (id: number) => {

        const friend = friends.find(friend => friend.id === id);

        if (!friend) {
            return;
        }

        api.put(`/friends/${id}`, {
            name: friend.name,
            likes: friend.likes,
            follow: !friend.follow
        }).then(() => {

            const newFriends = friends.map(friend => {
                if (friend.id === id) {
                    return {
                        ...friend,
                        follow: !friend.follow
                    }
                }

                return friend;
            });

            setFriends(newFriends);

        })
            .catch((err) => {
                console.log(err);
            });

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Friends</Text>

            <TextInput
                placeholder="Name"
                onChangeText={(text) => setName(text)}
                style={styles.input}
            />

            <RectButton
                style={styles.button}
                onPress={handleSearch}
                enabled={name.length > 0}
            >
                {loading ? (
                    <ActivityIndicator
                        size="small"
                        color="#fff"
                    />
                ) : (
                    <Text style={styles.buttonText}>Search</Text>
                )}
            </RectButton>

            {friends && <FriendsList
                data={friends}
                follow={handleFollow}
            />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        padding: 25
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#444'
    },
    input: {
        borderWidth: 1,
        padding: 7,
        borderRadius: 2,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#7159c1',
        borderRadius: 2,
        padding: 10,

    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold'
    },
    list: {
        marginTop: 10
    }
});