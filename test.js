
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







import { useState } from 'react';


const Page = () => {

  const [fetchedData, setFetchedData] = useState([]);

  const getApiData = async () => {
    const response = await fetch();

    const data1 = await response.json();
    const data2 = await response.json();
    const data3 = await response.json();



    setFetchedData([
      ...(data1.data),
      ...data2,
      ...data3,
    ]);
  }


  return (
    <div>
      
      <button onClick={getApiData}>

      </button>

      {
        fetchedData.map(itemData => {
          return (
            <div>
              <p className="p-2 mb-1 text-blue-500">{itemData.name}</p>
              <img src={itemData.image} />
            </div>
          );
        })
      }
    </div>
  );
};

export default Page;














