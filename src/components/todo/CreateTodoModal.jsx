import { TextField, Modal, } from '@shopify/polaris';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateTodoModal({ isCreate, toggleModal, handleCreateTodo, value, handleChange }) {
    const createTodo = () => {
        if (!(value.trim() === '')) {
            handleCreateTodo();
        } else {
            toast.error('Todo text cannot be only spaces.', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    return (
        <Modal
            open={isCreate}
            onClose={toggleModal}
            title="Create Todo"
            primaryAction={{
                content: 'Create',
                onAction: createTodo,
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
