import React from 'react'
import { ScrollRestoration } from 'react-router';
import styles from './Menu.module.css'
import MenuModal from './MenuModal';
import SortingButtonList from './SortingButtonList'
import MenuMainContent from './MenuMainContent';
import NavigationBar from './NavigationBar';
import CartModal from './CartModal';
import dripCoffee from './assets/dripcoffee.png';
import viennaCoffee from './assets/viennacoffee.png';
import espresso from './assets/espresso.png';
import macchiato from './assets/macchiato.png';
import cappuccino from './assets/cappuccino.png';
import latte from './assets/latte.png';
import matchaLatte from './assets/matchalatte.png';
import milk from './assets/milk.png';
import orangeJuice from './assets/orangejuice.png'
import clubSandwich from './assets/clubsandwich.png'
import cookie from './assets/cookie.png'
import scone from './assets/scone.png'


export type SortingButtonContents = {
  ids: string[];
  targetIds: string[];
  name: string[];
}

export type MainContentIds = {
  ids: string[];
  ariaLabel: string[];
}

export type MenuModalInfo = {
  category: string;
  temperature: string;
  name: string;
  imgSrc: string;
  imgWidth: string;
  imgTransform: string;
  prices: number[];
}

function Menu() {
  const sortingButtonContents: SortingButtonContents = {
    ids: ['recommendation-tab', 'all-tab', 'drink-tab', 'food-tab'],
    targetIds: ['#recommendation-tab-pane', '#all-tab-pane', '#drink-tab-pane', '#food-tab-pane'],
    name: ['Pickup', 'All', 'Drinks', 'Foods']
  }
  const mainContentIds: MainContentIds = {
    ids: ['recommendation-tab-pane', 'all-tab-pane', 'drink-tab-pane', 'food-tab-pane'],
    ariaLabel: ['recommendation-tab', 'all-tab', 'drink-tab', 'food-tab']
  }
  const menuModalInformations: MenuModalInfo[] = [
    {category: 'drink', temperature: 'hotAndIced', name: 'DripCoffee', imgSrc: dripCoffee, imgWidth: '80%', imgTransform: 'translate(0px, max(-0.98vw))', prices: [380, 410, 440]},
    {category: 'drink', temperature: 'hotOnly', name: 'ViennaCoffee', imgSrc: viennaCoffee, imgWidth: '90%', imgTransform: 'translate(0px, max(-0.98vw))', prices: [420, 450, 480]},
    {category: 'drink', temperature: 'hotOnly', name: 'Espresso', imgSrc: espresso, imgWidth: '100%', imgTransform: 'translate(0px, 0px)', prices: [370, 400, 430]},
    {category: 'drink', temperature: 'hotAndIced', name: 'Macchiato', imgSrc: macchiato, imgWidth: '75%', imgTransform: 'translate(0px, 0px)', prices: [410, 440, 470]},
    {category: 'drink', temperature: 'hotAndIced', name: 'Cappuccino', imgSrc: cappuccino, imgWidth: '100%', imgTransform: 'translate(0px, max(-1.95vw))', prices: [500, 530, 560]},
    {category: 'drink', temperature: 'hotAndIced', name: 'Latte', imgSrc: latte, imgWidth: '150%', imgTransform: 'translate(0px, max(-0.98vw))', prices: [490, 520, 550]},
    {category: 'drink', temperature: 'hotAndIced', name: 'MatchaLatte', imgSrc: matchaLatte, imgWidth: '150%', imgTransform: 'translate(-0.49vw, max(-0.98vw))', prices: [510, 540, 570]},
    {category: 'drink', temperature: 'icedOnly', name: 'Milk', imgSrc: milk, imgWidth: '130%', imgTransform: 'translate(0px, 0px)', prices: [340, 370, 400]},
    {category: 'drink', temperature: 'icedOnly', name: 'OrangeJuice', imgSrc: orangeJuice, imgWidth: '90%', imgTransform: 'translate(0px, max(-0.98vw))', prices: [340, 370, 400]},
    {category: 'food', temperature: 'none', name: 'ClubSandwich', imgSrc: clubSandwich, imgWidth: '70%', imgTransform: 'translate(0px, 0)', prices: [550]},
    {category: 'food', temperature: 'none', name: 'Cookie', imgSrc: cookie, imgWidth: '80%', imgTransform: 'translate(0px, 0)', prices: [270]},
    {category: 'food', temperature: 'none', name: 'Scone', imgSrc: scone, imgWidth: '80%', imgTransform: 'translate(0px, 0)', prices: [330]}
  ]

  return (
    <div>
      <ScrollRestoration />
      <main className={styles.main}>
          <div className= {styles.basement}>
            <SortingButtonList sortingButtonContents={sortingButtonContents} />
            <div className={styles.mainContent}>
              <MenuMainContent mainContentIds={mainContentIds} />
              {/* <div className={styles.lings}></div> */}
            </div>
          </div>
      </main>
      <NavigationBar />
      {/* モーダル */}
      {
        menuModalInformations.map((menuModalInfo, index) => (
          <MenuModal menuModalInfo={menuModalInfo} key={index} />
        ))
      }
      <CartModal />
    </div>
  )
}

export default Menu