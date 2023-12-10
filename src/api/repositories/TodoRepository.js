const BASE_URL = `http://localhost:3000/api/todo`;

const todoRepository = {
    async getAllTodos() {
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            const todos = await response.json();
            return todos;
        } catch (error) {
            throw error;
        }
    },

    async createTodo(newTodo) {
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            });
            if (!response.ok) {
                throw new Error('Failed to create todo');
            }
            const createdTodo = await response.json();
            return createdTodo;
        } catch (error) {
            console.error('Error creating todo:', error.message);
            throw error;
        }
    },

    // Add other CRUD operations as needed
};

export default todoRepository;
