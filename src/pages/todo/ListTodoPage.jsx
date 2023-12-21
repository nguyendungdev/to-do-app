import { useState, useCallback, useEffect } from "react";
import "./style.scss";
import { Page, Button, Card, ResourceList, Text, ButtonGroup, ResourceItem, Badge } from '@shopify/polaris';
import CreateTodoModal from "../../components/todo/CreateTodoModal";
import useTodo from "../../hooks/useFetchTodo";
import { addData, updateStatus, remove } from "../../api/todoApi";


const ListTodoPage = () => {
    const {
        todos,
        loading: fetchLoading,
        setLoading,
        setTodos
    } = useTodo("/todo");
    const [selectedItems, setSelectedItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = useCallback(() => setIsOpen((opened) => !opened), []);

    const handleCreateTodo = async (value) => {
        try {
            setLoading(true)
            const response = await addData('/todo', { name: value });
            console.log(response.data)
            if (response.status == 201) {
                setTodos(prev => {
                    return [...prev, response.data.todo]
                })
            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false)
            toggleModal();
        }
    };

    const handleUpdate = async (ids) => {
        try {
            setLoading(true);
            const response = await updateStatus('/todo', { ids });
            if (response.status === 200) {
                const updateTodos = todos.map((todo) => {
                    if (ids.includes(todo.id)) {
                        return {
                            ...todo,
                            isCompleted: true,
                        };
                    }
                    return todo;
                })
                setTodos(updateTodos);

            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
            setSelectedItems([]);

        }
    }

    const handleDelete = async (ids) => {
        try {
            setLoading(true);

            const idList = ids.join(',');
            const response = await remove(`todo?ids=${idList}`);
            if (response.status === 200) {
                const newTodos = todos.filter((todo) => !idList.includes(todo.id));
                setTodos(newTodos);
                setSelectedItems([]);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false)
        }
    }

    const renderItem = (data) => {
        const { id, name, isCompleted } = data;
        return (
            <ResourceItem
                id={id}
                key={id + isCompleted}
                accessibilityLabel={`View details for ${name}`}
            >
                <Text variant="bodyMd" fontWeight="light" as="h3">
                    {name}
                </Text>
                <ButtonGroup>
                    {isCompleted ? (
                        <Badge tone="success">Done</Badge>
                    ) : (<Badge>Pending</Badge>)}
                    <Button tone="critical" onClick={() => handleUpdate([id])} disabled={isCompleted}>
                        {isCompleted ? 'Completed' : 'Complete'}
                    </Button>
                    <Button variant="primary" tone="critical" onClick={() => handleDelete([id])}>Delete</Button>
                </ButtonGroup>

            </ResourceItem>
        );
    }

    return (
        <Page title="To-dos" primaryAction={<Button onClick={() => setIsOpen(true)}>Create todo</Button>}>
            <CreateTodoModal
                isOpen={isOpen}
                handleSubmit={handleCreateTodo}
                handleChange={toggleModal}
            />
            <Card>
                <ResourceList
                    resourceName={{ singular: 'to-do', plural: 'to-dos', }}
                    loading={fetchLoading}
                    items={todos}
                    selectable={true}
                    selectedItems={selectedItems}
                    onSelectionChange={setSelectedItems}
                    renderItem={renderItem}
                    promotedBulkActions={[
                        {
                            content: 'Complete',
                            onAction: () => { handleUpdate(selectedItems); },
                        },
                        {
                            content: 'Delete',
                            onAction: () => { handleDelete(selectedItems) }
                        },
                    ]}
                    bulkActions={[]}
                />
            </Card>
        </Page >
    )
}
export default ListTodoPage;
