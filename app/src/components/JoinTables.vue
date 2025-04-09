<template>
    <div>
        <div v-if="!joinedGame">
            <button @click="joinGame">Join Game</button>
        </div>
        <div v-else>
            <span>{{ username }}</span>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'JoinGameButton',
    setup() {
        const joinedGame = ref(false);
        const username = ref('');

        const getUsername = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('username')
                .limit(1)
                .single();

            if (error) {
                console.error('Error fetching username:', error);
                return null;
            }
            return data.username;
        };

        const joinGame = async () => {
            const fetchedUsername = await getUsername();
            if (fetchedUsername) {
                username.value = fetchedUsername;
                joinedGame.value = true;
            } else {
                alert('Error retrieving username');
            }
        };

        return {
            joinedGame,
            username,
            joinGame,
        };
    },
};
</script>

<style scoped>
button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}

span {
    font-size: 20px;
    font-weight: bold;
}
</style>