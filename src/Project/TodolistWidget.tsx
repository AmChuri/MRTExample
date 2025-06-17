import AssignmentIcon from '@mui/icons-material/Assignment';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const initialTodos = [
  { id: 1, label: 'Review AE Listing', completed: false, user: 'JD' },
  { id: 2, label: 'Clean Lab Data', completed: true, user: 'AM' },
  {
    id: 3,
    label: 'Validate CM Listing',
    completed: false,
    user: 'JD',
  },
  {
    id: 4,
    label: 'Verify Demographics',
    completed: false,
    user: 'AM',
  },
];

const uniqueUsers = [
  ...new Set(initialTodos.map((todo) => todo.user)),
];

const TodoListWidget: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [filterUser, setFilterUser] = useState<string | null>(null);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const filteredTodos = filterUser
    ? todos.filter((t) => t.user === filterUser)
    : todos;

  return (
    <Card sx={{ height: '100%', borderRadius: 2, minWidth: 300 }}>
      <CardContent sx={{ pb: 1 }}>
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Typography
            variant="h6"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <AssignmentIcon sx={{ fontSize: 20, mr: 1 }} />
            Project Tasks
          </Typography>
          <IconButton size="small">
            <FilterListIcon />
          </IconButton>
        </Box>

        {/* User Filters */}
        <Stack direction="row" spacing={1} mb={1}>
          {uniqueUsers.map((user) => (
            <Avatar
              key={user}
              sx={{
                bgcolor:
                  filterUser === user ? 'primary.main' : 'grey.400',
                width: 28,
                height: 28,
                fontSize: 14,
                cursor: 'pointer',
              }}
              onClick={() =>
                setFilterUser(filterUser === user ? null : user)
              }
            >
              {user}
            </Avatar>
          ))}
        </Stack>

        {/* Task List */}
        <List dense>
          {filteredTodos.map((todo) => (
            <ListItem
              key={todo.id}
              disablePadding
              secondaryAction={
                <Avatar
                  sx={{
                    bgcolor: 'grey.300',
                    width: 24,
                    height: 24,
                    fontSize: 12,
                  }}
                >
                  {todo.user}
                </Avatar>
              }
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
              </ListItemIcon>
              <ListItemText
                primary={todo.label}
                primaryTypographyProps={{
                  style: {
                    textDecoration: todo.completed
                      ? 'line-through'
                      : 'none',
                    fontSize: '0.85rem',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>

        {/* Footer */}
        <Divider sx={{ my: 1 }} />
        <Box display="flex" justifyContent="space-between">
          <Chip
            label={`Pending: ${
              todos.filter((t) => !t.completed).length
            }`}
            color="warning"
            size="small"
          />
          <Chip
            label={`Done: ${todos.filter((t) => t.completed).length}`}
            color="success"
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoListWidget;
