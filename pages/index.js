
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


  const first = (id, value) => {
    // console.log('button was clicked: ', id, value);
  }

  return (
    <Container className="min-h-screen p-3">

      <Container>
        {/* <Button.Group 
        initial="one"
        onSelect={first}
        defaultStyle=""
        selectedStyle=""
        >
          <Button.Member id="one">Current</Button.Member>
          <Button.Member id="two">Other</Button.Member>
          <Button.Member id="three">Another</Button.Member>
          <Button.Report></Button.Report>
          <Button.Reset></Button.Reset> 
        </Button.Group> */}

        <Text>Multiple choice:</Text>

        <Button.Group 
        initial="two"
        maxSelect={4}
        onSelect={first}
        defaultStyle=""
        selectedStyle="bg-white"
        >
          <Button.Member id="one" value="First">Current</Button.Member>
          <Button.Member id="two" value="Second">Other</Button.Member>
          <Button.Member id="three" value="Third">Another</Button.Member>
        </Button.Group>

        <Button.Group 
        initial={["six", "four"]}
        maxSelect={4}
        onSelect={first}
        defaultStyle="text-red-700"
        defaultStyleRemove="bg-black"
        selectedStyle="bg-black"
        selectedStyleRemove="text-red-700"
        >
          <Button.Member id="four" value="fourth">Four</Button.Member>
          <Button.Member id="five" value="fifth">Five</Button.Member>
          <Button.Member id="six" value="sixth">Six</Button.Member>
        </Button.Group>
      </Container>
      
    </Container>
  )
}
