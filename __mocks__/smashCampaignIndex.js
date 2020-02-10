module.exports = [
  {
    title: 'Landry',
    notes: [
      {
        text: 'One of the main houses of the city.',
        whoKnows: [1, 2, 3, 4], // by character id
      }, {
        text: 'House Members:',
        whoKnows: [1, 2, 3, 4],
        notes: [
          {
            text: 'Lord Landry', // should auto link to the lord landry's entry
            whoKnows: [1, 2, 3, 4],
          }, {
            text: 'Lady Landry',
            whoKnows: [1, 2, 3, 4]
          }, {
            text: 'Gregory Landry', // 
            whoKnows: [1, 2, 3, 4]
          }, {
            text: 'Percy Landry',
            whoKnows: [1] // only smash knows
          },
        ]
      },
    ],
    tags: ['houses']
  }, {
    title: 'Lord Landry', // should auto include the notes from smash's campaign notes if smash is viewing
    notes: [
      {
        text: 'Lord of the Landry house',
        whoKnows: [1, 2, 3, 4]
      }, {
        text: 'Has twin, Drol Landry',
        whoKnows: [2],
        notes: [
          {
            text: 'Who\'s EVIL!!!',
            whoKnows: [] // only the DM knows about this
          }
        ]
      }
    ],
    tags: ['people'],
  }, {
    title: 'Drol Landry',
    showMask: true, // user 2 would see the title, all others would see ???, if false all others wouldn't even see an entry
    notes: [
      {
        text: 'Lord Landry\'s Twin',
        whoKnows: [2],
      },
      {
        text: 'Is very EVIL!',
        whoKnows: [],
        showMask: true, // when true, replace text with ??? so the users know they don't know something yet
      },
    ],
  },
];
