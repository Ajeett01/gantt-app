import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DetailsModalOptions from './DetailsModalOptions';
import React,{ useState } from 'react';
import { Select, TextField } from '@mui/material';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function TaskModal({
  isOpen,
  onClose,
  tasks,
  task,
  handleTaskDelete,
  handleClose,
  postTask}) {
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [state, setState] = React.useState({
    id: task ? task.id : '',
    name: task ? task.name : '',
    start: task ? task.start : new Date(),
    end: task ? task.end : new Date(),
    progress: task ? task.progress : 10,
    type: task ? task.type : '',
    dependencies: task ? task.dependencies || '' : '',
  });

  const handleEditClick = () => {
    // Toggle the edit mode when the edit button is clicked
    setIsEditingTask(!isEditingTask);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    console.log(value);
    setState({ ...state, [name]: value });
    console.log(state);
  };

  const handleEditClose=()=>{
    setIsEditingTask(!isEditingTask)
  }

  const editTask = (state)=>{
    axios
      .post('http://localhost:5000/api/tasks/updateTask', state)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log('Here is the error', e.message);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    if (state.progress < 0 || state.progress > 100) {
      alert('Progress must be between 0 and 100.');
    }
    postTask(state);
    // handleAddTask(state);
    handleEditClick(!isEditingTask);
  };

  if (!task) {
    return null; // Render nothing if task is null
  }

  const startDateString = task.start ? new Date(task.start).toDateString() : '';
  const endDateString = task.end ? new Date(task.end).toDateString() : '';
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {isEditingTask ? 'Edit Task' : <span>{task.name}</span>}
      </DialogTitle>
      <DialogContent>
        <DetailsModalOptions
          handleTaskDelete={handleTaskDelete}
          task={task}
          onClose={onClose}
          handleEditClick={handleEditClick}
          isEditingTask={isEditingTask}
        />
        {isEditingTask ? (
          <>
            <form
              style={{
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                rowGap: 32,
                width: 500,
              }}
              onSubmit={handleSubmit}
            >
              <TextField
                placeholder="Name"
                type="name"
                name="name"
                value={state.name}
                onChange={handleChange}
              />
              <TextField
                placeholder="Start"
                name="start"
                type="date"
                value={state.start}
                onChange={handleChange}
              />
              <TextField
                placeholder="End"
                name="end"
                type="date"
                value={state.end}
                onChange={handleChange}
              />
              <TextField
                placeholder="Progress"
                type="number"
                name="progress"
                value={state.progress}
                onChange={handleChange}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state.type}
                  label="Type"
                  name="type"
                  onChange={handleChange}
                >
                  <MenuItem value={'task'}>Task</MenuItem>
                  <MenuItem value={'milestone'}>Milestone</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Dependencies
                </InputLabel>
                <Select
                  labelId="demo-simple-select"
                  id="demo-simple"
                  value={state.dependencies}
                  label="Dependencies"
                  name="dependencies"
                  onChange={handleChange}
                >
                  {tasks.length > 0 &&
                    tasks.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.name}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={handleEditClose} className="space-around">
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <Typography>Progress: {task.progress}</Typography>
            <Typography>Start Date: {startDateString}</Typography>
            <Typography>End Date: {endDateString}</Typography>
            <Typography>Dependencies: {task.dependencies}</Typography>
            <Typography>Type: {task.type}</Typography>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
