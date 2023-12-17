import { Text, Button, ButtonGroup, ResourceItem, Badge } from '@shopify/polaris';
import "./style.scss"


function Todo({ item, handleCompleteClick, handleDeleteTodo }) {
  const { name, isCompleted } = item;
  return (
    <ResourceItem
      id={item.id}
      accessibilityLabel={`View details for ${name}`}
    >

      <Text variant="bodyMd" fontWeight="light" as="h3">
        {name}
      </Text>

      <ButtonGroup>
        {isCompleted ? (
          <Badge tone="success">Done</Badge>
        ) : (<Badge>Pending</Badge>)}
        <Button tone="critical" onClick={handleCompleteClick}>Complete</Button>
        <Button variant="primary" tone="critical" onClick={handleDeleteTodo}>Delete</Button>
      </ButtonGroup>

    </ResourceItem>
  );

}
export default Todo;