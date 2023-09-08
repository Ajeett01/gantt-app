// gantt-task-react

import 'gantt-task-react/dist/index.css';

import { Gantt, Task, ViewMode } from 'gantt-task-react';
import React, { useEffect, useState } from 'react';
import { getStartEndDateForProject } from './componenets/Helper.jsx';

import { ViewSwitcher } from './componenets/view-switcher.jsx';
import { Button } from 'antd';
import AddTaskDialogue from './componenets/AddTaskDialog/AddTaskDialog.js';
import axios from 'axios';
import TaskModal from './componenets/DetailsModal.js';

function GanttChart() {
  const [fetchedTask, setFetchedTask] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const assign = [
    {
      id: 1,
      name: 'Task 1',
      start: new Date(),
      end: new Date(),
      assignedTo: 'User A', // Assigned to User A
    },
    {
      id: 2,
      name: 'Task 2',
      start: new Date(),
      end: new Date(),
      assignedTo: 'User B', // Assigned to User B
    },
    // ...
  ];

  function formatDate(data) {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    };
    const formattedData = data.map((item) => {
      const formattedStart = new Date(item.start)
        .toLocaleString('en-US', options)
        .replace(/,/g, ''); // Remove commas from the formatted date

      const formattedEnd = new Date(item.end)
        .toLocaleString('en-US', options)
        .replace(/,/g, ''); // Remove commas from the formatted date

      const parsedStart = new Date(Date.parse(formattedStart));
      const parsedEnd = new Date(Date.parse(formattedEnd));

      return {
        ...item,
        start: parsedStart,
        end: parsedEnd,
      };
    });
    return formattedData; // Add this line to return the formatted data
  }

  function formatNewDate(data) {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    };
    // const formattedData =
    const formattedStart = new Date(data.start)
      .toLocaleString('en-US', options)
      .replace(/,/g, ''); // Remove commas from the formatted date

    const formattedEnd = new Date(data.end)
      .toLocaleString('en-US', options)
      .replace(/,/g, ''); // Remove commas from the formatted date

    const parsedStart = new Date(Date.parse(formattedStart));
    const parsedEnd = new Date(Date.parse(formattedEnd));

    return {
      ...data,
      start: parsedStart,
      end: parsedEnd,
    };
    // return formattedData; // Add this line to return the formatted data
  }

  function getTasks() {
    axios
      .get('http://localhost:5000/api/tasks')
      .then((res) => {
        console.log(res.data);
        setTasks(formatDate(res.data));
        console.log(tasks);
      })
      .catch((e) => {
        console.log('Here is the error', e.message);
      });
  }

  console.log('64 ', tasks);

  function initTasks() {
    const currentDate = new Date();
    const tasks = [
      {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
        name: 'Ceeveediag',
        id: 'ProjectSample',
        progress: 25,
        type: 'project',
        hideChildren: false,
        displayOrder: 1,
      },
      {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        end: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          2,
          12,
          28
        ),
        name: 'Idea',
        id: 'Task 0',
        progress: 45,
        type: 'task',
        project: 'ProjectSample',
        displayOrder: 2,
      },
      {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
        end: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          4,
          0,
          0
        ),
        name: 'Research',
        id: 'Task 1',
        progress: 25,
        dependencies: ['Task 0'],
        type: 'task',
        project: 'ProjectSample',
        displayOrder: 3,
      },
      {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
        end: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          8,
          0,
          0
        ),
        name: 'Discussion with team',
        id: 'Task 2',
        progress: 10,
        dependencies: ['Task 1'],
        type: 'task',
        project: 'ProjectSample',
        displayOrder: 4,
      },
      {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
        end: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          9,
          0,
          0
        ),
        name: 'Developing',
        id: 'Task 3',
        progress: 2,
        dependencies: ['Task 2'],
        type: 'task',
        project: 'ProjectSample',
        displayOrder: 5,
      },
      {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
        name: 'Review',
        id: 'Task 4',
        type: 'task',
        progress: 70,
        dependencies: ['Task 2'],
        project: 'ProjectSample',
        displayOrder: 6,
      },
      {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
        name: 'Release',
        id: 'Task 6',
        progress: currentDate.getMonth(),
        type: 'milestone',
        dependencies: ['Task 4'],
        project: 'ProjectSample',
        displayOrder: 7,
      },
      {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
        name: 'Party Time',
        id: 'Task 9',
        progress: 0,
        isDisabled: true,
        type: 'task',
      },
    ];
    return tasks;
  }

  useEffect(() => {
    getTasks();
    console.log('Hii');
  }, []);

  const [view, setView] = useState(ViewMode.Day);

  const [isChecked, setIsChecked] = useState(true);
  const [modal, setModal] = useState(false);

  let columnWidth = 65;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const handleTaskChange = (task) => {
    console.log('On date change Id:' + task.id);
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project =
        newTasks[newTasks.findIndex((t) => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map((t) =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  function deleteTask(task) {
    axios
      .delete(`http://localhost:5000/api/tasks/${task}`)
      .then((res) => {
        console.log(`Task with ID ${task} deleted successfully.`);
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  }

  const handleTaskDelete = (task) => {
    const hasDependencies = task.dependencies && task.dependencies.length > 0;
    console.log(task.id);

    if (hasDependencies) {
      const confirmMessage = `This task has dependencies. Please remove them before deleting the task.`;
      alert(confirmMessage); 
      return false; 
    }

    const conf = window.confirm('Are you sure about ' + task.name + ' ?');
    console.log(task.id);
    if (conf) {
      deleteTask(task.id);
      const filteredTask = tasks.filter((t) => t.id !== task.id);

      setTasks(filteredTask);
    }
    return conf;
  };

  const handleProgressChange = async (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log('On progress change Id:' + task.id);
  };

  const handleDblClick = (task) => {
    // alert('On Double Click event Id:' + task.id);
    console.log(task);
    openModal(task);
  };

  const handleSelect = (task, isSelected) => {
    console.log(task.name + ' has ' + (isSelected ? 'selected' : 'unselected'));
  };

  const handleExpanderClick = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log('On expander click Id:' + task.id);
  };

  function handleClick() {
    setModal(true);
  }

  function handleClose() {
    setModal(false);
  }

  const postTask = (state) => {
    console.log(state);
    setTasks([...tasks, formatNewDate(state)]);
    axios
      .post('http://localhost:5000/api/tasks', state)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log('Here is the error', e.message);
      });
  };

  function handleAddTask() {
    console.log('Task Added');
  }

  return (
    <div>
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        task={selectedTask}
        handleTaskDelete={handleTaskDelete}
        tasks={tasks}
        postTask={postTask}
        handleClose={handleClose}
      />
      {modal && (
        <AddTaskDialogue
          handleClose={handleClose}
          handleAddTask={handleAddTask}
          open={modal}
          setModal={setModal}
          postTask={postTask}
          formatDate={formatDate}
          tasks={tasks}
        />
      )}
      <>
        <ViewSwitcher
          onViewModeChange={(viewMode) => setView(viewMode)}
          onViewListChange={setIsChecked}
          isChecked={isChecked}
        />
        <h3>Gantt With Unlimited Height</h3>
        <span>
          <Button onClick={handleClick} style={{ margin: 10 }}>
            Add Task
          </Button>
        </span>
        <span>
          <span>
            <span style={{ width: '150px', fontWeight: 'bold' }}>
              Assigned To
            </span>
          </span>
          {tasks.length > 0 && (
            <Gantt
              tasks={tasks}
              viewMode={view}
              onDateChange={handleTaskChange}
              onDelete={handleTaskDelete}
              onProgressChange={handleProgressChange}
              onDoubleClick={handleDblClick}
              onSelect={handleSelect}
              onExpanderClick={handleExpanderClick}
              listCellWidth={isChecked ? '155px' : ''}
              columnWidth={columnWidth}
            ></Gantt>
          )}
        </span>
      </>
    </div>
  );
}

export default GanttChart;
