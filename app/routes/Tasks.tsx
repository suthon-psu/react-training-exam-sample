import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper,
} from '@mui/material';
import {
  Add,
  Delete,
  FilterList,
} from '@mui/icons-material';
import { useTaskStore } from '../store/taskStore';
import { useForm } from 'react-hook-form';

interface FormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

const Tasks: React.FC = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [filter, setFilter] = React.useState('all');
  const { tasks, toggleTask, deleteTask, addTask } = useTaskStore();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  // Implement filtering logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    if (filter === 'high') return task.priority === 'high';
    return true; // 'all'
  });

  const onSubmit = (data: FormData) => {
    addTask({
      ...data,
      completed: false
    });
    reset();
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Tasks
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Add Task
        </Button>
      </Box>

      {/* Filter */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FilterList />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Filter</InputLabel>
            <Select
              value={filter}
              label="Filter"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="all">All Tasks</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="high">High Priority</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body2" color="text.secondary">
            {filteredTasks.length} tasks
          </Typography>
        </Box>
      </Paper>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No tasks found
          </Typography>
          <Button variant="outlined" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
            Add Your First Task
          </Button>
        </Paper>
      ) : (
        <Box>
          {filteredTasks.map((task) => (
            <Card key={task.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {/* Checkbox */}
                  <Checkbox
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />

                  {/* Task Content */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'text.secondary' : 'text.primary'
                      }}
                    >
                      {task.title}
                    </Typography>

                    {task.description && (
                      <Typography variant="body2" color="text.secondary">
                        {task.description}
                      </Typography>
                    )}

                    <Box sx={{ mt: 1 }}>
                      <Chip
                        label={task.priority}
                        size="small"
                        color={
                          task.priority === 'high' ? 'error' :
                            task.priority === 'medium' ? 'warning' : 'default'
                        }
                      />
                    </Box>
                  </Box>

                  {/* Delete Button */}
                  <IconButton
                    color="error"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Add Task Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Task</DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Task Title"
                  variant="outlined"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  {...register('title', { required: 'กรุณากรอกชื่อ task' })}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={3}
                  {...register('description')}
                />
              </Grid>
              <Grid size={12}>
                <FormControl fullWidth error={!!errors.priority}>
                  <InputLabel>Priority</InputLabel>
                  <Select 
                    label="Priority" 
                    defaultValue="medium"
                    {...register('priority', { required: 'กรุณาเลือก priority' })}
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                  {errors.priority && (
                    <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                      {errors.priority.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Tasks;