import { useState, useCallback } from "react";
import "./style.scss";
import Todo from "../../components/todo/TodoItem";
import { Page, Button, Card, ResourceList, } from '@shopify/polaris';
import CreateTodoModal from "../../components/todo/CreateTodoModal";
import useTodoStore from "../../hooks/useTodoStore";


const ListTodoPage = () => {
    const { loading: fetchLoading, setTodos } = useTodoStore();
    const [isCreate, setIsCreate] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [value, setValue] = useState();

    const todos = [{
        id: 1,
        name: "asdasd"
    }]

    const handleChange = useCallback(
        (newValue) => setValue(newValue),
        [],
    );
    const toggleModal = useCallback(() => setIsCreate((active) => !active), []);

    function resolveItemIds({ id }) {
        return id;
    }

    return (
        <Page
            title="To-do"
            primaryAction={<Button onClick={() => setIsCreate(true)}>Create todo</Button>}
        >
            <CreateTodoModal
                isCreate={isCreate}
                toggleModal={toggleModal}
                value={value}
                handleChange={handleChange}
            />

            <Card>
                <ResourceList
                    loading={fetchLoading}
                    items={todos}
                    renderItem={Todo}
                    selectedItems={selectedItems}
                    onSelectionChange={setSelectedItems}
                    promotedBulkActions={[
                        {
                            content: 'Complete',
                            onAction: () => console.log('Todo: implement bulk edit'),
                        },
                        {
                            content: 'Delete',
                            onAction: () => { console.log('1111') },
                        },
                    ]}
                    bulkActions={[
                        {
                            content: 'Add tags',
                            onAction: () => console.log('Todo: implement bulk add tags'),
                        },
                        {
                            content: 'Delete customers',
                            onAction: () => console.log('Todo: implement bulk delete'),
                        },
                    ]}
                    resolveItemId={resolveItemIds}

                />

            </Card>
        </Page >
    )
}

export default ListTodoPage;