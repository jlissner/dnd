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
      bonusModifier: 0,
      notes: 'adv. on checks when in a **rage**',
    },
    {
      name: 'Dexterity',
      abbv: 'dex',
      value: 15,
      bonusModifier: 0,
    },
    {
      name: 'Constitution',
      abbv: 'con',
      value: 18,
      bonusModifier: 0,
      notes: '',
    },
    {
      name: 'Intelligence',
      abbv: 'int',
      value: 9,
      bonusModifier: 0,
      notes: '',
    },
    {
      name: 'Wisdom',
      abbv: 'wis',
      value: 12,
      bonusModifier: 0,
      notes: '',
    },
    {
      name: 'Charisma',
      abbv: 'cha',
      value: 10,
      bonusModifier: 0,
      notes: '',
    },
  ],
  savingThrows: [
    {
      name: 'Strength',
      bonusModifier: 0,
      type: 'str',
      proficient: true,
      notes: 'adv. on saves when in a **rage**',
    }, {
      name: 'Dexterity',
      bonusModifier: 0,
      type: 'dex',
      proficient: false,
      notes: 'adv. on effects I can see, such as traps and spells (Danger Sense)',
    }, {
      name: 'Constitution',
      bonusModifier: 0,
      type: 'con',
      proficient: true,
      notes: '',
    }, {
      name: 'Intelligence',
      bonusModifier: 0,
      type: 'int',
      proficient: false,
      notes: '',
    }, {
      name: 'Wisdom',
      bonusModifier: 0,
      type: 'wis',
      proficient: false,
      notes: '',
    }, {
      name: 'Charisma',
      bonusModifier: 0,
      type: 'cha',
      proficient: false,
      notes: '',
    },
  ],
  skills: [
    {
      name: 'Acrobatics',
      bonusModifier: 0, // additional bonusModifier to skill
      type: 'dex',
      proficient: false,
      notes: '',
    },
    {
      name: 'Animal Handling',
      bonusModifier: 0,
      type: 'wis',
      proficient: true,
      notes: '',
    },
    {
      name: 'Arcana',
      bonusModifier: 0,
      type: 'int',
      proficient: false,
      notes: '',
    },
    {
      name: 'Athletics',
      bonusModifier: 0,
      type: 'str',
      proficient: true,
      notes: 'adv. when rageing',
    },
    {
      name: 'Deception',
      bonusModifier: 0,
      type: 'cha',
      proficient: false,
      notes: '',
    },
    {
      name: 'History',
      bonusModifier: 0,
      type: 'int',
      proficient: false,
      notes: '',
    },
    {
      name: 'Insight',
      bonusModifier: 0,
      type: 'wis',
      proficient: false,
      notes: '',
    },
    {
      name: 'Intimidation',
      bonusModifier: 0,
      type: 'cha',
      proficient: false,
      notes: '',
    },
    {
      name: 'Investigation',
      bonusModifier: 0,
      type: 'int',
      proficient: false,
      notes: '',
    },
    {
      name: 'Medicine',
      bonusModifier: 0,
      type: 'wis',
      proficient: false,
      notes: '',
    },
    {
      name: 'Nature',
      bonusModifier: 0,
      type: 'int',
      proficient: false,
      notes: '',
    },
    {
      name: 'Perception',
      bonusModifier: 0,
      type: 'wis',
      proficient: false,
      notes: '',
    },
    {
      name: 'Performance',
      bonusModifier: 0,
      type: 'cha',
      proficient: false,
      notes: '',
    },
    {
      name: 'Persuasion',
      bonusModifier: 0,
      type: 'cha',
      proficient: false,
      notes: '',
    },
    {
      name: 'Religion',
      bonusModifier: 0,
      type: 'int',
      proficient: false,
      notes: '',
    },
    {
      name: 'Sleight of Hand',
      bonusModifier: 0,
      type: 'dex',
      proficient: false,
      notes: '',
    },
    {
      name: 'Stealth',
      bonusModifier: 0,
      type: 'dex',
      proficient: false,
      notes: '',
    },
    {
      name: 'Survival',
      bonusModifier: 0,
      type: 'wis',
      proficient: true,
      notes: '',
    },
  ],
  languagesAndProficiencies: '### Languages\n- Common\n- Giant\n### Proficiencies\n- Riding a Horse',
  money: {
    cp: 0,
    sp: 0,
    ep: 0,
    gp: 331,
    pp: 0,
  },
  attacks: [
    {
      category: 'spells',
      name: 'Fireball',
      dmg: '8d6',
      dmgType: 'Fire',
      uses: [true, false],
      range: '120ft',
      notes: 'All creatures in a 20ft radius need to make a DEX save',
      bonusModifier: 0,
      proficient: false,
      modType: 'int:dex', // int is the attckers modivier, dex is what the defender has to use to beat it
    },
    {
      category: 'spells',
      name: 'Firebolt',
      dmg: '2d10',
      dmgType: 'Fire',
      uses: [],
      range: '120ft',
      notes: 'Things hit may catch fire',
      bonusModifier: 0,
      proficient: true  ,
      modType: 'int',
    },
    {
      category: 'melee',
      name: 'Warhammer',
      dmg: '1d10',
      dmgType: 'Bludgening',
      uses: [],
      range: '',
      notes: 'Smash\'s most prized posesstion\n\nVersatile (ld10)',
      bonusModifier: 1,
      proficient: true,
      modType: 'str',
    }, {
      category: 'ranged',
      name: 'Javalin of Lightning',
      dmg: '1d6+1',
      dmgType: 'Piercing',
      uses: [false],
      range: '30/120',
      bonusModifier: 1,
      notes: 'Upgradeable.\n\nOnce per day can activate to do an additional 4d6 lightning damage, DC13 dex save',
      proficient: true,
      modType: 'str',
    },
    {
      category: 'melee',
      name: 'Short Sword',
      dmg: '1d6',
      dmgType: 'Piercing',
      uses: [],
      notes: 'Finesse, light',
      bonusModifier: 0,
      proficient: true,
      modType: 'str',
    },
    {
      category: 'melee',
      name: 'Greataxe',
      dmg: '1d12',
      dmgType: 'Slashing',
      uses: [],
      notes: 'Heavy, two-handed',
      bonusModifier: 0,
      proficient: true,
      modType: 'str',
    },
    {
      category: 'melee',
      name: 'Battleaxe',
      dmg: '1d8, 1d10',
      dmgType: 'Slashing',
      uses: [],
      notes: 'Versatile (1d10)',
      bonusModifier: 0,
      proficient: true,
      modType: 'str',
    },
  ],
  equipment: [
    {
      name: 'Amulate of the Drunkard',
      longDesc: 'While wearing this amulate the user recovers 1d8 worth of hp when they drink alcohol.\n\nRoll a d20 each time you drink, once the total rolled is greater than or equal to 15, you are drunk.',
      tags: ['attunement'],
    }, {
      name: 'Amulate of Divine Fury',
      shortDesc: '+1d4 dmg vs shadow/demonic',
      longDesc: 'A lost symbol of a dead god is engraved on this simple silver amulate.\n\nWhile attuned, the users weapon deals 1d4 radiant damage in addition to it\'s standard damage.\n\nShadow or demonic only.',
      tags: ['attunement'],
    }, {
      name: 'Braces of Defense',
      shortDesc: '+2 AC when not wearing armor.',
      longDesc: 'Simple leather bracers with small steel studs on them.\n\nWhile wearing these bracers you gain *+2* to AC if you are wearing no other armor or shield.',
      tags: ['attunement', 'armor'],
    }, {
      name: 'Hat of Disguise',
      shortDesc: 'User can cast disguise self at will.',
      tags: ['attunement'],
    }, {
      name: 'Bag of Holding',
      longDesc: 'A bag that has a larger interior space than it\'s outer dimensions.\n\nThe bag weighs 15lbs regardless of it\'s contents.\n\nThe bag can hold up to 500lbs of items.\n\nItems in the bag cannot be larget than 64 cubic feet.',
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
      shortDesc: '2d4+2',
      longDesc: 'A character who drinks the magical red fiuid in this vial regains 2d4 + 2 hit points.\n\nDrinking or administering a potion takes an action.',
    }, {
      name: '5x Dragon Fruit from Heart Tree',
    },
    {
      name: 'Marybell',
      longDesc: 'My horse, has a cart',
      tags: ['mount'],
    },
  ],
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
  spells: [],
  spellSlots: [],
}
