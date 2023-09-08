// // Input date string from the database
// const dateString = '2023-08-03T18:30:00.000Z';

// // Create a new Date object using the input date string
// const date = new Date(dateString);

// // Format the date to the desired output format
// const options = {
//   weekday: 'short',
//   year: 'numeric',
//   month: 'short',
//   day: '2-digit',
//   hour: 'numeric',
//   minute: 'numeric',
//   second: 'numeric',
//   timeZoneName: 'short',
// };

// const formattedDate = date.toLocaleString('en-US', options).replace(/,/g, '');

// console.log(formattedDate); // Output: Tue, Aug 08, 2023, 00:00:00 GMT+5:30

const currentDate = new Date();
const data = [
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
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2, 12, 28),
    name: 'Idea',
    id: 'Task 0',
    progress: 45,
    type: 'task',
    project: 'ProjectSample',
    displayOrder: 2,
  },
  {
    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
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
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
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
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
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

  return {
    ...item,
    start: formattedStart,
    end: formattedEnd,
  };
});

console.log(formattedData);
