import { useSocket } from "@/socket/SocketContext";
import { actions } from "@/constants/const";

export const useSocketEmit = () => {
    const { socket } = useSocket(); // ← destrutturato

    const emit = (event, data) => {
        return new Promise((resolve, reject) => {
            if (!socket?.connected) {
                reject(new Error('Socket not connected'));
                return;
            }

            socket.emit(event, data, (response) => {
                console.log(response, 'RESPONSE');
                if (response.result.success) {
                    resolve(response.result.data);
                } else {
                    reject(new Error(response.result.error));
                }
            });
        });
    };

    const listTodos = async () => {
        const todos = await emit('todos:list');
        console.log(todos);
        return todos;
    };

    const listPosts = async () => {
        return await emit(actions.LIST_POST);
    };

    return {
        listTodos,
        listPosts,
    };
};