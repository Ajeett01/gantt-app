import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function AddTaskDialogue(props) {
  const { open, handleClose, handleAddTask, setModal, postTask, tasks } = props;
  console.log(tasks);
const [state, setState] = React.useState({
    id: '',
    name: '',
    start: new Date(),
    end: new Date(),
    progress: 10,
    type:'',
    dependencies: '',
  });

  const close = () => {
    // handleClose();
    setModal(false)
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    console.log(value);
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    if (state.progress < 0 || state.progress > 100) {
      alert('Progress must be between 0 and 100.');
    }
    postTask(state);
    // handleAddTask(state);
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Add Item</DialogTitle>
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
          onChange={handleChange}
        />
        <TextField
          placeholder="Start"
          name="start"
          type="date"
          onChange={handleChange}
        />
        <TextField
          placeholder="End"
          name="end"
          type="date"
          onChange={handleChange}
        />
        <TextField
          placeholder="Progress"
          type="number"
          name="progress"
          onChange={handleChange}
        />
        {/* <TextField
          placeholder="type"
          type="text"
          name="type"
          onChange={handleChange}
        /> */}
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
          <InputLabel id="demo-simple-select-label">Dependencies</InputLabel>
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
                return(
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>);
              })}
          </Select>
        </FormControl>
        {/* <TextField
          placeholder="Dependencies"
          type="text"
          name="dependencies"
          onChange={handleChange}
        /> */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="submit">Submit</Button>
          <Button onClick={handleClose} className="space-around">
            Cancel
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

export default AddTaskDialogue;
