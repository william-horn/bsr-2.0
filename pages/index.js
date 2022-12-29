
import Head from 'next/head'
import Image from 'next/image'
import Button from '../components/buttons/Button';
import Container from '../components/Container';
import Text from '../components/typography/Text';
import Title from '../components/typography/Title';
import Searchbar from '../components/Searchbar';
import IconImage from '../components/IconImage';
import Link from 'next/link';
import Icons from '../public/icons';
import Enum from '../enum';
import useLocalStorageState from '../hooks/useLocalStorageState'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import IconText from '../components/typography/IconText';

/*
  > TESTING MONGODB CONNECTION
*/


/*
  < TESTING MONGODB CONNECTION
*/

export default function Home() {
  const [creatures, setCreatures] = useState([]);
  const [testLocalStorage, setTestLocalStorage] = useLocalStorageState('test_key', 'initial_value');
  
  const updateLocalStorage = () => {
    console.log('updated value');
    setTestLocalStorage('updated_value');
  }

  const onSearch = (searchQuery) => {
    console.log('The user searched for: ', searchQuery);
  }
  
  return (
    <Container className="bg-blue-500 page h-[200vh]">
      <Container className="w-[50%] mx-auto flex flex-col items-center bg-gray-500 h-full">
        <Title className="my-4 text-2xl">Example of icons mixed in text</Title>

        <Container className="w-[300px] h-[100px]">
          <IconText>
            <Text>Hello</Text> <IconImage src={Icons.GemIcon} size="26px"/> <Text>world</Text> 
            <Text>Hello</Text> <IconImage src={Icons.FavoriteIcon} size="26px"/> <Text>world</Text>
            <Text>700</Text> <IconImage src={Icons.DamageIcon} size="26px"/> <Text>world</Text>
            <Text>500</Text> <IconImage src={Icons.FriendsPageIcon} size="26px"/> <Text>world</Text>
          </IconText>
        </Container>

        <Title className="my-4 text-2xl">Example of buttons</Title>
      

        <Button
        leftIcon={Icons.ArrowLeftIcon} 
        // className="bg-red-700"
        onClick={() => console.log('button was clicked')}>
          Test Button
        </Button>

        <Button
        leftIcon={Icons.GemIcon} 
        url="https://www.youtube.com"
        // className="bg-red-700"
        onClick={() => console.log('button was clicked')}>
          Test Link
        </Button>

        <Button>Just an ordinary button</Button>

        <Button onClick={async () => {
          const res = await fetch('/api/test', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await res.json();

          console.log('got back from get: ', data);
        }}>
          Get API Data
        </Button>

        <Button onClick={async () => {
          const res = await fetch('/api/test', {
            method: 'POST',
            body: JSON.stringify({ 
              username: 'Frank',
              password: 'some password',
              email: 'frank@frank.com' 
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await res.json();

          console.log('got back from post: ', data);
        }}>
          Post API Data
        </Button>


        <Button onClick={async () => {
          const res = await fetch('/api/creatures', {
            method: 'POST',
            body: JSON.stringify({ 
              name: 'William',
              url: 'www.will.com',
              stats: {
                skinny: true,
                smart: 'kind of not really',
                tired: true
              },
              drops: [
                { 
                  category: 'ring', 
                  items: [
                    { name: 'lucky', url: '.com', dropTrials: 0, dropSuccesses: 0, avgDropRate: 0 },
                    { name: 'gold', url: '.com', dropTrials: 0, dropSuccesses: 0, avgDropRate: 0 },
                  ]
                }
              ]
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await res.json();

          console.log('got back from post: ', data);
        }}>
          Post Creatures Data
        </Button>

        <Button onClick={async () => {
          const res = await fetch('/api/creatures', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await res.json();
          setCreatures(data);
          console.log('got back from get: ', data);
        }}>
          Get Creatures
        </Button>

        <Container>
          {
            creatures.map(creature => {
              return <Text key={uuidv4()}>{creature.name}</Text>
            })
          }
        </Container>

        <Title className="my-4 text-2xl">Sticky elements example</Title>
        <Container className="h-[600px] bg-gray-600 flex flex-col">
          <Container className="w-[500px] h-[200px] bg-blue-600 mb-3 sticky top-0"></Container>
          <Container className="w-[300px] h-[200px] bg-red-700 mb-3 sticky top-0"></Container>

          <Container className="w-[600px] h-full bg-green-400 overflow-y-auto max-h-[300px] relative">
            <Container className="w-[50px] h-[80px] bg-black"></Container>
            <Container className="w-[50px] h-[80px] bg-yellow-400 sticky top-0"></Container>
            <Container className="w-[50px] h-[80px] bg-black"></Container>
            <Container className="w-[50px] h-[80px] bg-black"></Container>
            <Container className="w-[50px] h-[80px] bg-black"></Container>
            <Container className="w-[50px] h-[80px] bg-black"></Container>
            <Container className="w-[50px] h-[80px] bg-black"></Container>
          </Container>
        </Container>

        <Title className="my-4 text-2xl">Example of search bar</Title>

        <Searchbar 
        className="w-[50%] bg-white mb-10" 
        placeholder="click here to search!"
        leftIcon={Icons.SearchIcon} 
        leftIconSize={24}
        />

        <Searchbar 
        className="w-[50%] bg-white" 
        placeholder="click here to search!" 
        historySize={5}
        historyDomain={Enum.StorageKeys.SearchHistoryDomain.Secondary.value}
        leftIcon={Icons.SearchIcon} 
        rightIcon={Icons.DamageIcon} 
        leftIconSize={24}
        />

        {/* 
        <SearchBar className="w-[50%]" historySize={10}>
          <SearchBar.Icon src={Icons.SearchIcon} size="36"/>
          <SearchBar.Placeholder>Please search here</SearchBar.Placeholder>
        </SearchBar>
        */}

      </Container>
      
    </Container>
  )
}
