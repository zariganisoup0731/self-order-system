import React from 'react'
import { Link, ScrollRestoration } from 'react-router'
import { useEffect } from 'react'
import styles from './PurchasedConfirmed.module.css'
import ProgressBar from './ProgressBar'
import OrderList from './OrderList'
import { useOrder } from './OrderContext'

function PurchaseConfirmed() {
  const {orderNumber} = useOrder();
  const {totalAmount} = useOrder();
  const {setProgress} = useOrder();
  const {setReady} = useOrder();
  const {ready} = useOrder();
  const {progress} = useOrder();
  const {howToUse} = useOrder();
  const {payment} = useOrder();

  useEffect(() => {
    setTimeout(() => {
        setProgress('100');
        setReady('OK');
      }, 5000);
  }, []);

  const isNoticeChecked = progress === '100' && ready === '';

  return (
    <div>
      <ScrollRestoration />
      <div className={styles.header}>
        <ProgressBar />
      </div>
      <div className={styles.messageContainer}>
        <div className={`noto-sans-jp-500 ${styles.message}`}>
          <div />
          <div className={`sedgwick-ave-regular ${styles.text}`} style={{fontSize: 'max(30px, 5.86vw)'}}>
            thank you for your order!
          </div>
          <div className={styles.text}>
            <div></div>
            あなたの注文番号は
            <span className={`racing-sans-one-regular ${styles.orderNumber}`}>
              {orderNumber}
            </span>
            です。
          </div>
          <div className={styles.text}>
            準備完了の通知が届き次第カウンターへお越しください。
          </div>
          <div />
        </div>
      </div>
      <div className={styles.caption}>
        ご注文内容
      </div>
      <div className={`noto-sans-jp-700 ${styles.howToUseAndPaymentContainer}`}>
        <div className={styles.info}>ご利用方法：{howToUse}</div>
        <div className={styles.info}>お支払い方法：{payment}</div>
      </div>
      <div className={styles.orderListContainer}>
        <OrderList />
      </div>
      <div className={`noto-sans-jp-900 ${styles.totalAmount}`}>
        合計金額：￥{totalAmount}
      </div>
      <Link to='/' className={styles.linkToTopButtonContainer}>
        <button disabled={!isNoticeChecked} className={styles.linkToTopButton}>
          トップ画面へ
        </button>
      </Link>
      <div style={{width: '100%', height: '3.91vw'}} />
      {ready === 'OK' &&
        <div className={styles.noticeModalContainer}>
          <div className={styles.noticeModal}>
            <div className={`noto-sans-jp-400 ${styles.messageContainer}`}>
              ご注文の商品が用意できました
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={(e) => setReady('')} className={styles.okButton}>
                OK
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default PurchaseConfirmed
