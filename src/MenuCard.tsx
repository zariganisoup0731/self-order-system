import React from 'react'
import type { MenuCardInfo } from './MenuCardList'
import styles from './MenuCard.module.css'
import tape from './assets/tape.png'
import crown1 from './assets/crown_1.png'
import crown2 from './assets/crown_2.png'
import crown3 from './assets/crown_3.png'

type Props = {
  menuCardInfo: MenuCardInfo;
}

function MenuCard(props: Props) {
  const {menuCardInfo} = props;
  return (
    <div className={`receipt-font ${styles.menuCard}`}>
      <img src={tape} className={styles.tape} />
      <div className={styles.menuName}>{menuCardInfo.name}</div>
      <div className={styles.line} style={{ margin: 'min(-10px, -1.63vw) 0 0 0' }}>ーーーーーーーーーー</div>
      <div className={styles.imgArea}>
        <img src={menuCardInfo.imgSrc} style={{height: menuCardInfo.imgWidth, transform: menuCardInfo.imgTransform}}></img>
      </div>
      <div className={styles.line}>ーーーーーーーーーー</div>
      <div className={styles.price}>{menuCardInfo.price}</div>
      <div className={styles.orderButtonContainer}>
        <button type='button' className='btn btn-primary rounded-pill noto-sans-jp-200' data-bs-toggle='modal' data-bs-target={`#${menuCardInfo.name}MenuModal`}>
          <div style={{fontSize: 'max(16px, 2.6vw)'}}>注文する</div>
        </button>
      </div>
    </div>
  )
}

export default MenuCard
