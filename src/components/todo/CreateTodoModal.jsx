import { TextField, Modal, } from '@shopify/polaris';

function CreateTodoModal({ isCreate, toggleModal, handleCreateTodo, value, handleChange }) {
    return (
        <Modal
            open={isCreate}
            onClose={toggleModal}
            title="Create Todo"
            primaryAction={{
                content: 'Create',
                onAction: handleCreateTodo,
            }}
            secondaryActions={{
                content: 'Close',
                onAction: toggleModal,
            }}
        >
            <Modal.Section>
                <TextField
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </Modal.Section >
        </Modal >
    )
}
export default CreateTodoModal;
