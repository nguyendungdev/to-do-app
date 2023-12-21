import { TextField, Modal, FormLayout, Form } from '@shopify/polaris';
import { useState, useCallback, useEffect } from "react";


function CreateTodoModal({
    isOpen,
    handleChange = () => { },
    handleSubmit = () => { }
}) {
    const [value, setValue] = useState();
    const handleChangeText = useCallback((newValue) => setValue(newValue), [],);

    useEffect(() => {
        if (!isOpen) {
            setValue("");
        }
    }, [isOpen]);


    return (
        <Modal
            open={isOpen}
            onClose={handleChange}
            title="Create Todo"
            primaryAction={{
                content: 'Create',
                onAction: () => handleSubmit(value, setValue),
                disabled: !value
            }}
            secondaryActions={{
                content: 'Close',
                onAction: handleChange,
            }}
        >
            <Modal.Section>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(value, setValue);
                    }}
                >
                    <FormLayout>
                        <TextField
                            placeholder="Todo name"
                            value={value}
                            onChange={handleChangeText}
                            autoComplete="off"
                        />
                    </FormLayout>
                </Form>
            </Modal.Section >
        </Modal >
    )
}
export default CreateTodoModal;
