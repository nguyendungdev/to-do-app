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
    // const [isDisable, setIsDisable] = useState(false);


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
            const response = await todoRepository.createTodo({ name: value, isCompleted: false });
            if (response.success) {
                toast.success("Thêm thành công", {
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
            toast.error("Có lỗi xảy ra vui lòng thử lại!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            throw e;

        }
    }

    const handleDeleteTodo = async (id) => {
        try {
            const response = await todoRepository.deteleTodo(id);
            if (response.status === 200) {
                const newTodo = todos.filter(todo => todo.id !== parseInt(id));
                toast.success("Xóa thành công", {
                    position: toast.POSITION.TOP_RIGHT,
                })
                setTodos(newTodo)
            }
        } catch (e) {
            toast.error("Có lỗi xảy ra vui lòng thử lại!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            throw e;
        }
    }

    const handleCompleteTodo = async (id) => {
        try {
            const response = await todoRepository.updateStatusTodo(id)
            if (response.status === 200) {
                toast.success("Cập nhật thành công", {
                    position: toast.POSITION.TOP_RIGHT,
                })
                setTodos(todoList => {
                    return todoList.map(todo => {
                        if (todo.id === parseInt(id)) {
                            return {
                                ...todo,
                                isCompleted: true
                            }
                        }
                        return todo;
                    })
                });
            }
        }
        catch (e) {
            toast.error("Có lỗi xảy ra vui lòng thử lại!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.error(e);
        }
    };
    const handleBulkDelete = async () => {
        try {
            const id = selectedItems.join(',');
            const response = await todoRepository.deleteTodoList(id)
            if (response.status === 200) {
                toast.success("Xóa thành công", {
                    position: toast.POSITION.TOP_RIGHT,
                })
                const newTodos = todos.filter((todo) => { return !selectedItems.includes(todo.id) });
                setTodos(newTodos);
                setSelectedItems([]);
            }
        } catch (e) {
            toast.error("Có lỗi xảy ra vui lòng thử lại!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.error('Có lỗi xảy ra vui lòng thử lại:', e);
        }
    };

    const handleBulkComplete = async () => {
        try {
            const id = selectedItems.join(',');
            const response = await todoRepository.updateMulti(id);
            if (response.status === 200) {
                toast.success("Cập nhật thành công", {
                    position: toast.POSITION.TOP_RIGHT,
                })

                const newTodos = todos.map(todo => {
                    if (selectedItems.includes(todo.id)) {
                        return {
                            ...todo,
                            isCompleted: true,
                        };
                    }
                    return todo;
                });

                setTodos(newTodos);
                setSelectedItems([]);
            }
        }
        catch (e) {
            toast.error("Có lỗi xảy ra vui lòng thử lại!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.error(e);
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
                            handleCompleteClick={() => handleCompleteTodo(data.id)}
                            handleDeleteTodo={() => handleDeleteTodo(data.id)}
                            isCompleted={data.isCompleted}
                        />
                    )
                }}
                promotedBulkActions={[
                    {
                        content: 'Complete',
                        onAction: handleBulkComplete,
                    },
                    {
                        content: 'Delete',
                        onAction: handleBulkDelete,
                    },
                ]}
                bulkActions={[]}
                resolveItemId={resolveItemIds}
            />
        </Page >
    )
}

export default ListTodoPage;
