import React from 'react'
import { useOrder } from './OrderContext'
import styles from './OrderList.module.css'
import trashSticker from './assets/trashSticker.png'
import trashStickerDisable from './assets/trashStickerDisable.png'

function OrderList() {
  const {orders} = useOrder();
  const {setOrderToRemove} = useOrder();
  const {progress} = useOrder();

  return (
    <div className={`${styles.container}`}>
      <div className={`sedgwick-ave-regular ${styles.header}`}>OrderList</div>
      {
        orders.map((order, index) => (
            <div className={styles.itemContainer} key={index}>
              {order.category === 'drink' &&
                <div className={`tegaki-zatsu-font ${styles.orderContainer}`}>
                  <div className={styles.imgAndNameContainer}>
                    <div className={styles.imgContainer}>
                      <img src={order.imgSrc} style={{height: `${order.imgHeight}`, transform:`${order.imgTransform}`}} />
                    </div>
                    <div className={styles.nameContainer}>{order.name}</div>
                  </div>
                  <div />
                  <div className={styles.optionsContainer}>
                    <div />
                    <div className={styles.optionContainer}>Hot/Iced: {order.temperature}</div>
                    <div className={styles.optionContainer}>サイズ: {order.size}</div>
                    <div className={styles.optionContainer}>数量: {order.quantity}</div>
                    <div />
                  </div>
                  <div />
                  {progress == '0' &&
                    <button type='button' onClick={(e) => setOrderToRemove(order)} className={styles.removeButtonContainer}>
                      <img src={trashSticker} style={{width: '80%', filter: 'drop-shadow(max(2px, 0.29vw) max(2px, 0.29vw) 2px rgb(0 0 0 / 25%)'}}/>
                    </button>
                  }
                  {progress != '0' &&
                    <button type='button' disabled onClick={(e) => setOrderToRemove(order)} className={styles.removeButtonContainer}>
                      <img src={trashStickerDisable} style={{width: '80%', filter: 'drop-shadow(max(2px, 0.29vw) max(2px, 0.29vw) 2px rgb(0 0 0 / 25%)'}}/>
                    </button>
                  }
                  <div />
                </div>
              }
              {order.category === 'food' &&
                <div className={`tegaki-zatsu-font ${styles.orderContainer}`}>
                  <div className={styles.imgAndNameContainer}>
                    <div className={styles.imgContainer}>
                      <img src={order.imgSrc} style={{height: `${order.imgHeight}`, transform:`${order.imgTransform}`}} />
                    </div>
                    <div className={styles.nameContainer}>{order.name}</div>
                  </div>
                  <div />
                  <div className={styles.optionsContainer} style={{gridTemplateRows: '0.5fr 1fr 1fr 0.5fr'}}>
                    <div />
                    <div className={styles.optionContainer}>温め: {order.heatUp}</div>
                    <div className={styles.optionContainer}>数量: {order.quantity}</div>
                    <div />
                  </div>
                  <div />
                  {progress == '0' &&
                    <button type='button' onClick={(e) => setOrderToRemove(order)} className={styles.removeButtonContainer}>
                      <img src={trashSticker} style={{width: '80%', filter: 'drop-shadow(max(2px, 0.29vw) max(2px, 0.29vw) 2px rgb(0 0 0 / 25%)'}}/>
                    </button>
                  }
                  {progress != '0' &&
                    <button type='button' disabled onClick={(e) => setOrderToRemove(order)} className={styles.removeButtonContainer}>
                      <img src={trashStickerDisable} style={{width: '80%', filter: 'drop-shadow(max(2px, 0.29vw) max(2px, 0.29vw) 2px rgb(0 0 0 / 25%)'}}/>
                    </button>
                  }
                  <div />
                </div>
              }
            </div>
        ))
      }
    </div>
  )
}

export default OrderList
