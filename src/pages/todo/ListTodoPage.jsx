import { useState, useCallback, useEffect } from "react";
import "./style.scss";
import Todo from "../../components/todo/TodoItem";
import { Page, Button, Card, ResourceList } from '@shopify/polaris';
import CreateTodoModal from "../../components/todo/CreateTodoModal";
import useTodoStore from "../../hooks/useTodoStore";
import todoRepository from "../../api/repositories/TodoRepository";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ListTodoPage = () => {
    const { todos, loading: fetchLoading, setTodos } = useTodoStore();
    const [isCreate, setIsCreate] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [value, setValue] = useState();

    const handleChange = useCallback(
        (newValue) => setValue(newValue),
        [],
    );
    const resourceName = {
        singular: 'to-do',
        plural: 'to-do',
    };
    const toggleModal = useCallback(() => setIsCreate((active) => !active), []);

    function resolveItemIds({ id }) {
        return id;
    }

    const handleCreateTodo = async () => {
        try {
            const response = await todoRepository.createTodo({ name: value });
            if (response.success) {
                toast.success("Successfully added", {
                    position: toast.POSITION.TOP_RIGHT,
                })
                setTodos(prev => {
                    return [...prev, response.data]
                })
            }
            toggleModal();
            setValue("");
        }
        catch (e) {
            toast.error('Something went wrong', {
                position: toast.POSITION.TOP_RIGHT,
            });
            throw e;

        }
    }

    const handleUpdate = async (ids, isBulk = false) => {
        try {
            const idList = ids.join(',');
            const response = await todoRepository.updateStatus(idList);
            if (response.status === 200) {
                toast.success("Successfully updated", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                const updateFunction = (todo) => ({
                    ...todo,
                    isCompleted: !todo.isCompleted,
                });

                if (isBulk) {
                    const newTodos = todos.map((todo) =>
                        ids.includes(todo.id) ? updateFunction(todo) : todo
                    );
                    setTodos(newTodos);
                    setSelectedItems([]);
                } else {
                    setTodos(
                        (todoList) => todoList.map((todo) => (todo.id === ids[0] ? updateFunction(todo) : todo)));
                }
            }
        }

        catch (e) {
            toast.error('Something went wrong', {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.error(e);
        }
    }


    const handleDelete = async (ids) => {
        try {
            const idList = ids.join(',');
            const response = await todoRepository.detele(idList);
            if (response.status === 200) {
                toast.success("Successfully updated", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                const newTodos = todos.filter((todo) => !idList.includes(todo.id));
                setTodos(newTodos);
                setSelectedItems([]);
            }
        } catch (e) {
            console.log(e)
            toast.error('Something went wrong', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }


    return (
        <Page
            title="To-do"
            primaryAction={<Button onClick={() => setIsCreate(true)}>Create todo</Button>}
        >
            <CreateTodoModal
                isCreate={isCreate}
                toggleModal={toggleModal}
                handleCreateTodo={handleCreateTodo}
                handleChange={handleChange}
                value={value}
            />
            <ResourceList
                resourceName={resourceName}
                loading={fetchLoading}
                items={todos}
                selectable={true}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                renderItem={(data) => {
                    return (
                        <Todo
                            item={data}
                            handleCompleteClick={() => handleUpdate([data.id])}
                            handleDeleteTodo={() => handleDelete([data.id])}
                            isCompleted={data.isCompleted}
                        />
                    )
                }}
                promotedBulkActions={[
                    {
                        content: 'Complete',
                        onAction: () => { handleUpdate(selectedItems, true); },
                    },
                    {
                        content: 'Delete',
                        onAction: () => { handleDelete(selectedItems, true); }
                    },
                ]}
                bulkActions={[]}
                resolveItemId={resolveItemIds}
            />
        </Page >
    )
}

export default ListTodoPage;
