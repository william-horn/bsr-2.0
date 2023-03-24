
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
import Test from '../components/Test';


export default function Home(props) {
  const [homeState, setHomeState] = useState("default");

  return (
    <Container className="min-h-screen p-3">
      <p>hello</p>

      {/* <Button
        className={{
          "rp:outer": "bg-black",
          "rm:outer": "bg-blue"
        }}
      >
      Hello World
      </Button>

    <Button.Group
    className={{
      
    }}
    >
      <Button.Member>Hello</Button.Member>
    </Button.Group> */}
      
    </Container>
  )
}
