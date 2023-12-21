import { useState, useEffect } from 'react';
import { getData } from '../api/todoApi';

const useTodo = (url = "") => {
    const [loading, setLoading] = useState(false);
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        const loadTodos = async () => {
            try {
                setLoading(true);
                const { data } = await getData(url);
                setTodos(data);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        loadTodos();
    }, []);

    return { todos, loading, setLoading, setTodos };
};

export default useTodo;
