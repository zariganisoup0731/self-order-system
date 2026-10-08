import React from 'react'
import styles from './MenuCardList.module.css'
import MenuCard from './MenuCard'
import dripCoffeeSticker from './assets/dripcoffeeSticker.png'
import viennaCoffeeSticker from './assets/viennacoffeeSticker.png'
import espressoSticker from './assets/espressoSticker.png'
import macchiatoSticker from './assets/macchiatoSticker.png'
import cappuccinoSticker from './assets/cappuccinoSticker.png'
import latteSticker from './assets/latteSticker.png'
import matchaLatteSticker from './assets/matchalatteSticker.png'
import milkSticker from './assets/milkSticker.png'
import orangeJuiceSticker from './assets/orangejuiceSticker.png'
import clubSandwichSticker from './assets/clubsandwichSticker.png'
import cookieSticker from './assets/cookieSticker.png'
import sconeSticker from './assets/sconeSticker.png'

type Props = {
  category: string;
}

export type MenuCardInfo = {
  name: string;
  imgSrc: string;
  imgWidth: string;
  imgTransform: string;
  price: string;
  popularity: number;
}

function MenuCardList(props: Props) {
  const drinkMenuCardInformations: MenuCardInfo[] = [
    {name: 'DripCoffee', imgSrc: dripCoffeeSticker, imgWidth: '130%', imgTransform: 'translate(0, min(-10px, -1.5vw))', price: '￥380～', popularity: 2},
    {name: 'ViennaCoffee', imgSrc: viennaCoffeeSticker, imgWidth: '130%', imgTransform: 'translate(0, min(-10px, -1.5vw))', price: '￥420～', popularity: 0},
    {name: 'Espresso', imgSrc: espressoSticker, imgWidth: '80%', imgTransform: 'translate(0, min(-2.5px, -0.46vw))', price: '￥370～', popularity: 0},
    {name: 'Macchiato', imgSrc: macchiatoSticker, imgWidth: '95%', imgTransform: 'translate(0, min(-2.5px, -0.46vw))', price: '￥410～', popularity: 0},
    {name: 'Cappuccino', imgSrc: cappuccinoSticker, imgWidth: '140%', imgTransform: 'translate(0, min(-18px, -2.6vw))', price: '￥500～', popularity: 0},
    {name: 'Latte', imgSrc: latteSticker, imgWidth: '95%', imgTransform: 'translate(0, min(-6px, -0.98vw))', price: '￥490～', popularity: 1},
    {name: 'MatchaLatte', imgSrc: matchaLatteSticker, imgWidth: '145%', imgTransform: 'translate(min(-2px, -0.39vw), min(-4px, -0.72vw))', price: '￥510～', popularity: 3},
    {name: 'Milk', imgSrc: milkSticker, imgWidth: '105%', imgTransform: 'translate(0, 0)', price: '￥340～',popularity: 0},
    {name: 'OrangeJuice', imgSrc: orangeJuiceSticker, imgWidth: '110%', imgTransform: 'translate(0, min(-10px, -1.5vw))', price: '￥340～', popularity: 0},
  ]
  const foodMenuCardInformations: MenuCardInfo[] = [
    {name: 'ClubSandwich', imgSrc: clubSandwichSticker, imgWidth: '85%', imgTransform: 'translate(0, 0)', price: '￥550', popularity: 0},
    {name: 'Cookie', imgSrc: cookieSticker, imgWidth: '90%', imgTransform: 'translate(0, 0)', price: '￥270', popularity: 0},
    {name: 'Scone', imgSrc: sconeSticker, imgWidth: '90%', imgTransform: 'translate(0, 0)', price: '￥330', popularity: 0}
  ]


  if(props.category === 'drink') {
    return (
      <div className={styles.menuCardList}>
        <div className='row row-cols-2 row-cols-md-3 gx-3 gy-4 gx-md-4 gy-md-5'>
          {
            drinkMenuCardInformations.map((menuCardInfo, index) => (
              <div className={`col`}>
                <MenuCard menuCardInfo={menuCardInfo} key={index} />
              </div>
            ))
          }
        </div>
      </div>
    )
  } else if(props.category === 'food') {
    return(
      <div className={styles.menuCardList}>
        <div className='row row-cols-2 row-cols-md-3 gx-3 gy-4 gx-md-4 gy-md-5'>
          {
            foodMenuCardInformations.map((menuCardInfo, index) => (
              <div className={`col`}>
                <MenuCard menuCardInfo={menuCardInfo} key={index} />
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default MenuCardList
