module.exports = () => {
    const data = {
        friends: []
    }

    for (let i = 0; i < 500; i++) {
        data.friends.push({
            id: i + 1,
            name: `Friend ${i + 1}`,
            likes: 5,
            follow: false
        })
    }

    return data;
}