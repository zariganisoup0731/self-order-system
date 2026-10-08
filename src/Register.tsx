import React from 'react'
import { ScrollRestoration } from 'react-router'
import { Link } from 'react-router'
import styles from './Register.module.css'
import { useOrder } from './OrderContext'
import OrderList from './OrderList'
import ProgressBar from './ProgressBar'
import RemoveConfirmationModal from './RemoveConfirmationModal'
import googlePay from './assets/google-pay-mark.png'
import applePay from './assets/Apple_Pay_Mark_RGB_041619.svg'

function Register() {
  const {orderToRemove} = useOrder();
  const {totalAmount} = useOrder();
  const {howToUse} = useOrder();
  const {payment} = useOrder();
  const {setProgress} = useOrder();
  const {setHowToUse} = useOrder();
  const {setPayment} = useOrder();
  const {generateOrderNumber} = useOrder();
  const {orders} =useOrder();
  const isConfirmed = howToUse != '' && payment != '' && orders.length != 0
  const confirmThePurchase = () => {
    setProgress('50');
    generateOrderNumber();
  }

  return (
    <div>
      <ScrollRestoration />
      <div className={styles.header}>
        <ProgressBar />
      </div>
      <div className={styles.container}>
        <div>
          <div className={`noto-sans-jp-500 ${styles.caption}`}>
            ご利用方法
          </div>
          <div className={styles.cardsContainer}>
            <div />
            <div className={styles.cardContainer}>
              <input type="radio" value='お持ち帰り' checked={howToUse === 'お持ち帰り'} onChange={(e) => setHowToUse(e.target.value)} className="btn-check" name="howToUse" id="toGo" autoComplete="off" />
              <label className={styles.card} htmlFor='toGo'>
                <div className={styles.icon}>
                  <i className='bi bi-bag-fill' />
                </div>
                <div className={`noto-sans-jp-300 ${styles.name}`}>
                  お持ち帰り
                </div>
                <div />
              </label>
            </div>
            <div />
            <div className={styles.cardContainer}>
              <input type="radio" value='店内でお食事' checked={howToUse === '店内でお食事'} onChange={(e) => setHowToUse(e.target.value)} className="btn-check" name="howToUse" id="eatIn" autoComplete="off" />
              <label className={styles.card} htmlFor='eatIn'>
                <div className={styles.icon}>
                  <i className='bi bi-shop' />
                </div>
                <div className={`noto-sans-jp-300 ${styles.name}`}>
                  店内でお食事
                </div>
                <div />
              </label>
            </div>
            <div />
          </div>
        </div>
        <div>
          <div className={styles.blank} />
          <div className={`noto-sans-jp-500 ${styles.caption}`}>
            お支払い方法
          </div>
          <div className={styles.paymentCardsContainer}>
            <div className={styles.cardsContainer} style={{height: '100%'}}>
              <div />
              <div className={styles.cardContainer}>
                <input type="radio" value='現金' checked={payment === '現金'} onChange={(e) => setPayment(e.target.value)} className="btn-check" name="payment" id="cash" autoComplete="off" />
                <label className={styles.card} htmlFor='cash'>
                  <div className={styles.icon}>
                    <i className='bi bi-wallet2' />
                  </div>
                  <div className={`noto-sans-jp-300 ${styles.name}`}>
                    現金
                  </div>
                  <div />
                </label>
              </div>
              <div />
              <div className={styles.cardContainer}>
                <input type="radio" value='クレジットカード' checked={payment === 'クレジットカード'} onChange={(e) => setPayment(e.target.value)} className="btn-check" name="payment" id="credit" autoComplete="off" />
                <label className={styles.card} htmlFor='credit'>
                  <div className={styles.icon}>
                    <i className='bi bi-credit-card-fill' />
                  </div>
                  <div className={`noto-sans-jp-300 ${styles.name}`}>
                    クレジットカード
                  </div>
                  <div />
                </label>
              </div>
              <div />
            </div>
            <div className={styles.cardsContainer} style={{height: '100%'}}>
              <div />
              <div className={styles.cardContainer}>
                <input type="radio" value='Google Pay' checked={payment === 'Google Pay'} onChange={(e) => setPayment(e.target.value)} className="btn-check" name="payment" id="googlePay" autoComplete="off" />
                <label className={styles.card} htmlFor='googlePay'>
                  <div className={styles.icon}>
                    <img src={googlePay} style={{width: '30%'}}/>
                  </div>
                  <div className={`noto-sans-jp-300 ${styles.name}`}>
                    Google Pay
                  </div>
                  <div />
                </label>
              </div>
              <div />
              <div className={styles.cardContainer}>
                <input type="radio" value='Apple Pay' checked={payment === 'Apple Pay'} onChange={(e) => setPayment(e.target.value)} className="btn-check" name="payment" id="applePay" autoComplete="off" />
                <label className={styles.card} htmlFor='applePay'>
                  <div className={styles.icon}>
                    <img src={applePay} style={{width: '25%'}}/>
                  </div>
                  <div className={`noto-sans-jp-300 ${styles.name}`}>
                  Apple Pay
                  </div>
                  <div />
                </label>
              </div>
              <div />
            </div>
          </div>
          <div className={styles.blank} />
        </div>
        <div style={{overflowY: 'auto'}}>
          <div className={`noto-sans-jp-500 ${styles.caption}`}>
            ご注文内容確認
          </div>
          <div className={styles.orderListContainer}>
            <OrderList />
          </div>
        </div>
        <div>
          <div className={`noto-sans-jp-900 ${styles.totalAmount}`}>
            合計金額：￥{totalAmount}
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <Link to='/menu' className={styles.buttonContainer}>
            <button className={styles.backButton}>
              メニュー画面へ戻る
            </button>
          </Link>
          <Link to='/purchasedConfirmed' className={styles.buttonContainer}>
            <button onClick={confirmThePurchase} disabled={!isConfirmed} className={styles.confirmedButton}>
              注文を確定する
            </button>
          </Link>
        </div>
      </div>
      {orderToRemove &&
        <RemoveConfirmationModal />
      }
    </div>
  )
}

export default Register
