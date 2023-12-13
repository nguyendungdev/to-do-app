import env from "../../utils/env";


class TodoRepository {

    constructor() {
        this.baseUrl = `${env.apiUrl}/todo`;
    }
    async getAllTodos() {
        try {
            console.log(this.baseUrl)
            const response = await fetch(`${this.baseUrl}?sort=desc`);
            const todos = await response.json();
            return todos;
        } catch (error) {
            throw error;
        }
    }

    async createTodo(newTodo) {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        });

        const createdTodo = await response.json();
        return createdTodo;
    }

    deteleTodo(id) {
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    deleteTodoList(ids) {
        return fetch(`${this.baseUrl}?ids=${ids}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    updateStatusTodo(id) {
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    updateMulti(ids) {
        return fetch(`${this.baseUrl}?ids=${ids}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }


};
const todoRepository = new TodoRepository();

export default todoRepository;
