import env from "../../utils/env";

class TodoRepository {

    constructor() {
        this.baseUrl = `${env.apiUrl}/todo`;
    }
    async getAllTodos() {
        try {
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

    detele(ids) {
        return fetch(`${this.baseUrl}?ids=${ids}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    updateStatus(ids) {
        return fetch(`${this.baseUrl}?ids=${ids}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }


};
const todoRepository = new TodoRepository();

export default todoRepository;
