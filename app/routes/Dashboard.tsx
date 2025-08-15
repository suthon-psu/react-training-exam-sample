import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Paper,
    List,
    ListItem,
    ListItemText,
    Chip,
} from '@mui/material';
import {
    Assignment,
    CheckCircle,
    Schedule,
    TrendingUp,
} from '@mui/icons-material';
import { useTaskStore } from '../store/taskStore';

const Dashboard: React.FC = () => {
    const { tasks } = useTaskStore();

    // Calculate statistics
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    // Get recent tasks (5 latest)
    const recentTasks = tasks.slice(0, 5);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Dashboard
            </Typography>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Assignment color="primary" sx={{ fontSize: 40, mb: 1 }} />
                            <Typography variant="h4" color="primary">
                                {totalTasks}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Total Tasks
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
                            <Typography variant="h4" color="success.main">
                                {completedTasks}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Completed
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Schedule color="warning" sx={{ fontSize: 40, mb: 1 }} />
                            <Typography variant="h4" color="warning.main">
                                {pendingTasks}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Pending
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <TrendingUp color="info" sx={{ fontSize: 40, mb: 1 }} />
                            <Typography variant="h4" color="info.main">
                                {completionRate}%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Completion Rate
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Recent Tasks */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Recent Tasks
                </Typography>

                {recentTasks.length === 0 ? (
                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                        No tasks yet. Create your first task!
                    </Typography>
                ) : (
                    <List>
                        {recentTasks.map((task) => (
                            <ListItem
                                key={task.id}
                                sx={{
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    mb: 1
                                }}
                            >
                                <ListItemText
                                    primary={task.title}
                                    secondary={task.description}
                                />
                                <Chip
                                    label={task.completed ? 'Completed' : 'Pending'}
                                    color={task.completed ? 'success' : 'default'}
                                    size="small"
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Paper>
        </Container>
    );
};

export default Dashboard;