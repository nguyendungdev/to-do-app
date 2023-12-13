import { Card, Text, Button, ButtonGroup, Avatar, ResourceItem, Badge } from '@shopify/polaris';
import "./style.scss"
import { useState, useCallback } from "react";
import todoRepository from '../../api/repositories/TodoRepository';



function Todo({ item, handleCompleteClick, handleDeleteTodo }) {
  const { name, isCompleted } = item;
  return (
    <ResourceItem
      id={item.id}
      sortOrder={item.id}
      accessibilityLabel={`View details for ${name}`}
    >

      <Text variant="bodyMd" fontWeight="light" as="h3">
        {name}
      </Text>

      <ButtonGroup>
        {isCompleted ? (
          <Badge tone="success">Done</Badge>
        ) : (
          <Badge>Pending</Badge>

        )}
        <Button tone="critical" onClick={handleCompleteClick} disabled={item.isCompleted}>Complete</Button>
        <Button variant="primary" tone="critical" onClick={handleDeleteTodo}>Delete</Button>
      </ButtonGroup>

    </ResourceItem>
  );

};
export default Todo;