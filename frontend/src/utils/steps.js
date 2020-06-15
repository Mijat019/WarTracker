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
        next: false
    },
    {
        title: 'Success',
        message: 'Now, drag that new military leader as well',
        next: false
    },
    {
        title: 'Connect two',
        message: 'Press the highlighted button to open connection mode',
        next: false
    },
    {
        title: 'Connect two',
        message: 'Now press, first on the one, and then on the other marker.',
        next: false
    },
    {
        title: 'Disconnect two',
        message: 'Press the highlighted button to open disconnection mode.',
        next: false
    },
    {
        title: 'Disconnect two',
        message: 'Now press, first on the one, and then on the other marker.',
        next: false
    },
    {
        title: 'Success',
        message: "The basic operations of this application performed successfully. You can find more of them under the help menu.",
        next: true
    },
];

export default tutorialSteps;
