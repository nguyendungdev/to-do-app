import { Card, Text, Button, ButtonGroup, Avatar, ResourceItem, Badge } from '@shopify/polaris';
import "./style.scss"
import { useState, useCallback } from "react";



function Todo(item, _, index) {
  console.log(item)
  const { id, name, } = item;


  const [isCompleted, setIsCompleted] = useState(false);
  const handleCompleteClick = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <ResourceItem
      id={id}
      sortOrder={index}
      accessibilityLabel={`View details for ${name}`}
    >
      <div className='to-do'>
        <div>
          <Text variant="bodyMd" fontWeight="light" as="h3">
            {name}
          </Text>
        </div>
        <div >
          <ButtonGroup>
            {isCompleted ? (
              <Badge tone="success">Done</Badge>

            ) : (
              <Badge>Pending</Badge>

            )}
            <Button tone="critical" onClick={handleCompleteClick}>Complete</Button>
            <Button variant="primary" tone="critical">Delete</Button>
          </ButtonGroup>
        </div>
      </div>
    </ResourceItem>
  );

};
export default Todo;