const tutorialSteps = [
    {
        title: 'Zeroth step',
        message: 'This would be an error',
        next: false
    },
    {
        title: 'Welcome to the tutorial',
        message: 'Press NEXT to start.',
        next: true
    },
    {
        title: 'Open the drawer',
        message: 'Using this button, drawer can be opened or closed',
        next: false
    },
    {
        title: 'Add a battle',
        message: 'Click on the highlighted button + to add a new battle.',
        next: false
    },
    {
        title: 'Success',
        message: 'The battle successfully added. The same process goes for adding military leaders. Click next to proceed.',
        next: true
    },
    {
        title: 'Drag and drop',
        message: 'Now, you can drop your battle onto the map.',
        next: true
    },
];

export default tutorialSteps;
