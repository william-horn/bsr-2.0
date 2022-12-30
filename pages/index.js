
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
  return (
    <Container className=" bg-zinc-900 page min-h-[200vh]">
      <Container>
        <Title className="font-bold text-zinc-100">Some cool facts</Title>
      </Container>
    </Container>
  )
}
