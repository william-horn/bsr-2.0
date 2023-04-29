
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

// import Button from '../components/buttons/Button';
// import Container from '../components/Container';
// import Text from '../components/typography/Text';
// import Title from '../components/typography/Title';
// import Searchbar from '../components/Searchbar';
// import IconImage from '../components/IconImage';
// import IconText from '../components/typography/IconText';
// import Test from '../components/Test';

import Icons from '../public/icons';
import Enum from '../enum';
import useLocalStorageState from '../hooks/useLocalStorageState'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function Home(props) {

  return (
    <div className="min-h-screen p-3">
      <p>Hello, world!</p>
    </div>
  )
}
