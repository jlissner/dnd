module.exports = {
  id: '1',
  playerName: 'Joe',
  characterName: 'Smash',
  className: 'Barbarian',
  subClass: 'Bezerker',
  level: '8',
  race: 'Goliath',
  alignment: 'Chaotic Good',
  xp: 23500,
  ac: 17,
  initiative: 7,
  speed: 40,
  inspiration: '1d4',
  proficiencyBonus: 3,
  attributes: [
    {
      name: 'Strength',
      abbv: 'str',
      value: 20,
      modifier: 5,
      proficient: true,
      notes: 'adv. when in a *rage*',
    },
    {
      name: 'Dexterity',
      abbv: 'dex',
      value: 15,
      modifier: 2,
      proficient: false,
      notes: 'adv. on effects I can see, such as traps and spells (Danger Sense)',
    },
    {
      name: 'Constitution',
      abbv: 'con',
      value: 18,
      modifier: 4,
      proficient: true,
      notes: '',
    },
    {
      name: 'Intelligence',
      abbv: 'int',
      value: 9,
      modifier: -1,
      proficient: false,
      notes: '',
    },
    {
      name: 'Wisdom',
      abbv: 'wis',
      value: 12,
      modifier: 1,
      proficient: false,
      notes: '',
    },
    {
      name: 'Charisma',
      abbv: 'cha',
      value: 10,
      modifier: 0,
      proficient: false,
      notes: '',
    },
  ],
  skills: [
    {
      name: 'Acrobatics',
      modifiers: [], // something like { name: 'Boots of Jumping', value: 1, notes: 'Got these from killing the goblin king'}
      type: 'dex',
      proficient: false,
      notes: '',
    },
    {
      name: 'Animal Handling',
      modifiers: [],
      type: 'wis',
      proficient: true,
      notes: '',
    },
    {
      name: 'Arcana',
      modifiers: [],
      type: 'int',
      proficient: false,
      notes: '',
    },
    {
      name: 'Athletics',
      modifiers: [],
      type: 'str',
      proficient: true,
      notes: 'adv. when rageing',
    },
    {
      name: 'Deception',
      modifiers: [],
      type: 'cha',
      proficient: false,
      notes: '',
    },
    {
      name: 'History',
      modifiers: [],
      type: 'int',
      proficient: false,
      notes: '',
    },
    {
      name: 'Insight',
      modifiers: [],
      type: 'wis',
      proficient: false,
      notes: '',
    },
    {
      name: 'Intimidation',
      modifiers: [],
      type: 'cha',
      proficient: false,
      notes: '',
    },
    {
      name: 'Investigation',
      modifiers: [],
      type: 'int',
      proficient: false,
      notes: '',
    },
    {
      name: 'Medicine',
      modifiers: [],
      type: 'wis',
      proficient: false,
      notes: '',
    },
    {
      name: 'Nature',
      modifiers: [],
      type: 'int',
      proficient: false,
      notes: '',
    },
    {
      name: 'Perception',
      modifiers: [],
      type: 'wis',
      proficient: false,
      notes: '',
    },
    {
      name: 'Performance',
      modifiers: [],
      type: 'cha',
      proficient: false,
      notes: '',
    },
    {
      name: 'Persuasion',
      modifiers: [],
      type: 'cha',
      proficient: false,
      notes: '',
    },
    {
      name: 'Religion',
      modifiers: [],
      type: 'int',
      proficient: false,
      notes: '',
    },
    {
      name: 'Sleight of Handling',
      modifiers: [],
      type: 'dex',
      proficient: false,
      notes: '',
    },
    {
      name: 'Stealth',
      modifiers: [],
      type: 'dex',
      proficient: false,
      notes: '',
    },
    {
      name: 'Survival',
      modifiers: [],
      type: 'wis',
      proficient: true,
      notes: '',
    },
  ],
  languages: [{ name: 'Common', notes: '' }, { name: 'Giant', notes: '' }],
  proficiencies: [{ name: 'Riding Horses', notes: '' }],
  money: {
    cp: 0,
    sp: 0,
    ep: 0,
    gp: 331,
    pp: 0,
  },
  equipment: {
    armor: [], // { name, ac, modifier, modifierMax, preqStr, stealth, weight, notes }
    weapons: [
      {
        name: '+1 Warhammer',
        dmg: ['1d8+1', '1d10+1'],
        dmgType: 'bludgening',
        properties: 'Versatile (ld10)',
        modifier: 1,
        notes: '',
        quantity: 1,
        proficient: true,
      }, {
        name: 'Javalin of Lightning',
        dmg: ['1d6+1'],
        modifier: 1,
        dmgType: 'piercing',
        properties: 'Thrown (range 30/120)',
        notes: 'Upgradeable.\n\nOnce per day can activate to do an additional 4d6 lightning damage, DC13 dex save',
        quantity: 1,
        proficient: true,
      },
      {
        name: 'Short Sword',
        dmg: '1d6',
        dmgType: 'piercing',
        properties: 'Finesse, light',
        modifier: 0,
        notes: '',
        quantity: 4,
        proficient: true,
      },
      {
        name: 'Greataxe',
        dmg: '1d12',
        dmgType: 'slashing',
        properties: 'Heavy, two-handed',
        modifier: 0,
        notes: '',
        quantity: 2,
        proficient: true,
      },
      {
        name: 'Battleaxe',
        dmg: ['1d8', '1d10'],
        dmgType: 'slashing',
        properties: 'Versatile (1d10)',
        modifier: 0,
        notes: '',
        quantity: 3,
        proficient: true,
      },
    ], // { name, modifier, dmg, stat, range, weight, notes }
    other: [
      {
        name: 'Amulate of the Drunkard',
        properties: 'Requires attunement.\n\nWhile wearing this amulate the user recovers 1d8 worth of hp when they drink alcohol.\n\nRoll a d20 each time you drink, once the total rolled is greater than or equal to 15, you are drunk.'
      }, {
        name: 'Amulate of Divine Fury',
        properties: 'Requires attunement.\n\nA lost symbol of a dead god is engraved on this simple silver amulate.\n\nWhile attuned, the users weapon deals 1d4 radiant damage in addition to it\'s standard damage.\n\nShadow or demonic only.',
      }, {
        name: 'Braces of Defense',
        properties: 'Requires attunement.\n\nSimple leather bracers with small steel studs on them.\n\nWhile wearing these bracers you gain *+2* to AC if you are wearing no other armor or shield.',
      }, {
        name: 'Hat of Disguise',
        properties: 'Requires attunement.\n\nUser can cast disguise self at will.'
      }, {
        name: 'Bag of Holding',
        properties: 'A bag that has a larger interior space than it\'s outer dimensions.\n\nThe bag weighs 15lbs regardless of it\'s contents.\n\nThe bag can hold up to 500lbs of items.\n\nItems in the bag cannot be larget than 64 cubic feet.'
      }, {
        name: 'Salted Meat',
      }, {
        name: 'Immoveable Rod',
      }, {
        name: 'Wand',
      }, {
        name: 'Horn',
      }, {
        name: 'Healing Potion',
        properties: 'A character who drinks the magical red fiuid in this vial regains 2d4 + 2 hit points.\n\nDrinking or administering a potion takes an action.'
      }, {
        name: '5x Dragon Fruit from Heart Tree',
      },
      {
        name: 'Marybell',
        properties: 'My horse, has a cart',
      },
    ],
  },
  status: [],
  featuresAndTraits: [
    {
      name: 'Rage',
      uses: [true, false, false, false],
      shortDesc: '**+2** dmg | bludg/slash/pierce recist | lasts 1 minute',
      longDesc: 'Can go in to a rage **4** (0 used) times per long rest.\n\n+2 dmg while Raging.\n\nResistance to bludgeoning, piercing, and slashing damage.',
      tags: ['class'],
    },
    {
      name: 'Unarmored Defense',
      uses: [],
      shortDesc: '',
      longDesc: 'While you are not wearing any armor, your Armor Class equals 10+ your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.',
      tags: ['class'],
    },
    {
      name: 'Reckless Attack',
      uses: [],
      shortDesc: 'Attack with advantage',
      longDesc: 'Make all attack rolls with adv for the rest of the turn. All attacks against you have advantage for the rest of this turn.',
      tags: ['class'],
    },
    {
      name: 'Danger Sense',
      uses: [],
      shortDesc: '',
      longDesc: 'You have advantage on Dex saving throws against effects that you can see, such as traps and spells. To gain this benefit you can\'t be blinded, deafened or incapactiated.',
      tags: ['class'],
    },
    {
      name: 'Stones Endurence',
      uses: [false],
      shortDesc: '1d12 reduced dmg | reaction',
      longDesc: 'You can focus yourself to occasionally shrug off injury. When you take damage, you can use your reaction to roll a d12. Add your Constitution modifier to the number rolled, and reduce the damage by that total. After you use this trait, you can’t use it again until you finish a short or long rest.',
      tags: ['racial'],
    },
    {
      name: 'Powerful Build',
      uses: [],
      shortDesc: '',
      longDesc: 'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
      tags: ['racial'],
    },
    {
      name: 'Mountain Born',
      uses: [],
      shortDesc: 'Adapted to cold climates',
      longDesc: 'You\'re acclimated to high altitude, including elevations above 20,000 feet. You’re also naturally adapted to cold climates, as described in chapter 5 of the Dungeon Master’s Guide.',
      tags: ['racial'],
    },
    {
      name: 'Frenzy',
      uses: [],
      shortDesc: 'can attack as bonus action | suffer 1 exhaustion when rage ends',
      longDesc: 'Can go into a Frenzied Rage which allows you to make an attack as a bonus action. When your rage ends, suffer one level of exhaustion.',
      tags: ['class'],
    },
    {
      name: 'Fast Movement',
      uses: [],
      shortDesc: '+10 movement speed',
      longDesc: '',
      tags: ['class'],
    },
    {
      name: 'Mindless Rage',
      uses: [],
      shortDesc: 'Can\'t be charmed or frightened while raging',
      longDesc: 'You can\'t be charmed or frightened while raging. If you are charmed or frightened when you enter your rage, the effect is suspended for the duration of the rage.',
      tags: ['class'],
    },
    {
      name: 'Feral Instinct',
      uses: [],
      shortDesc: 'Advantage on initiative',
      longDesc: 'Advantage on Initiative\n\nAdditionally, if you are surprised at the beginning of combat and aren\'t incapacitated, you can act normally on your first turn, but only if you enter your rage before doing anything else on that turn.',
      tags: ['class'],
    },
    {
      name: 'Alert',
      uses: [],
      shortDesc: '+5 to initiative | can\'t be surprised',
      longDesc: '+5 to initiative.\n\nYou can\'t be surprised while you are conscious.\n\nOther creatures don\'t gain advantage on attack rolls against you as a result of being hidden from you.',
      tags: ['feat'],
    }
  ],
  savingThrows: [],
  health: {
    hitDice: '1d12',
    totalHitDice: 8,
    currentHp: 76,
    totalHp: 76,
    maxHp: 76,
    tempHp: 0,
    deathSaves: [true, false, false], // 1 success 2 fails
    notes: '',
  },
  personality: [
    { label: 'Flaws', text: 'single minded, dumb' },
  ],
  appearance: {
    age: null,
    height: '7\'7',
    weight: '315lbs',
    eyes: 'grey',
    skin: 'grey with tattoos',
    hair: 'bald',
    notes: '',
  },
  spells: [],
  spellSlots: [],
}
