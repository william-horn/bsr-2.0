
import Container from '../../Container';
import Image from 'next/image';
import Text from '../../typography/Text';
import Title from '../../typography/Title';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import Enum from '../../../enum';
import Head from 'next/head';
import Navbar from './Navbar';
import { useAppContext } from '../../../providers/AppProvider';
import { useRef, useEffect } from 'react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Images from '../../../public/images';
import FillImage from '../../FillImage';

/* 
<Image 
className="absolute pointer-events-none select-none logo-image" 
src={Images.Logo}
alt="logo" 
width={75} 
height={75}
/> 
*/

const PrimaryLayout = ({ children }) => {
  const { currentPage } = useAppContext();

  return (
    <Container className="primary-layout">
      <Header>
        <FillImage 
        className="w-full h-[280px] absolute"
        imgClassName="object-cover opacity-50"
        remove="relative"
        sizes="1920px"
        src={Images.HomeHeaderImg}
        />
        
        <Container className="py-6">
          <Header.Title className="relative flex flex-col flex-wrap items-center justify-center mx-auto break-all 3xsm:flex-row text-alpha w-fit">
            <span>Raven</span>
            <FillImage 
            src={Images.LogoImg} 
            className="w-[75px] h-[75px] min-w-[75px] min-h-[75px] 3xsm:ml-[-20px] ml-0"
            sizes="75px"
            />
          </Header.Title>
        </Container>
      </Header>
      
      <Navbar/>

      <Container className="relative min-h-screen layout-body bg-zinc-900">
        {children}
      </Container>

      <Footer>
        <Footer.Title>Reach Out</Footer.Title>
      </Footer>
    </Container>
  );
};

export default PrimaryLayout;

