
const GameItems = [
  {
    name: 'epic ring',
    type: 'ring',
    packsDroppedFrom: [],
    creaturesDroppedFrom: [],
    (virtual) bestDropSource: '',
    info: {
      damage_boost: 0,
      price: '999'
    }
  },

  {
    name: 'weakness',
    type: 'tc',
    packsDroppedFrom: [],
    creaturesDroppedFrom: [],
    (virtual) bestDropSource: '',
    info: {
      pips: 0,
      desc: ''
    }
  },

]


const Creatures = [

  {
    name: 'something'
    url: '',
    stats: {
      ...
    },
    drops: [
      { 
        category: 'ring', 
        items: [
          { name: 'epic ring', url: '', dropTrials: 0, dropSuccesses: 0, avgDropRate: 0 },
          { name: 'epic ring', url: '', dropTrials: 0, dropSuccesses: 0, avgDropRate: 0 },
          { name: 'epic ring', url: '', dropTrials: 0, dropSuccesses: 0, avgDropRate: 0 },
        ]
      }
    ]
  }

]