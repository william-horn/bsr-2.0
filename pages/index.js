
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

/*
  > TESTING MONGODB CONNECTION
*/


/*
  < TESTING MONGODB CONNECTION
*/


export default function Home() {
  const [homeState, setHomeState] = useState("default");

  return (
    <Container className="min-h-screen p-3">


      <Button.Group
      defaultStyles={{
        self: "bg-black"
      }}

      selectedStyles={{
        "self:remove": "bg-black",
        self: "bg-red-700",
        header: "yes",
      }}

      moreStyles={{
        header: "more",
        "self:remove": "bg-red-700"
      }}
      >

        <Button.Member

        >

        </Button.Member>

      </Button.Group>

      <Test
      className={{
        // self: "bg-blue-500",
        "self:remove": "bg-red-700",
        self: "bg-blue-500",
        title: "border-solid border-red-700 border-[3px]",
        "header:remove": "bg-white",
        header: {
          self: "PLS",
          title: "bg-black h-[50px]",
          "title:remove": "bg-green-500",
          header: {

          },
          
          _body: {

          }
          
          // body: "new",
          // "body:remove*": "something"
        }
        // header: {
        //   title: "text-red-700"
        // }
      }}
      >
        hello world
      </Test>


      <Button
      className={{
        _self: "bg-black",
        leftIcon: {
          _self: "w-[50px] h-[50px]",
          inner: "opacity-50",
        }
      }}
      >
        Button with Icon
      </Button>
      
      
    </Container>
  )
}
