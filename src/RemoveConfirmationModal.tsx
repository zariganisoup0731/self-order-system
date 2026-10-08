import React from 'react'
import { useOrder } from './OrderContext'
import styles from './RemoveConfirmationModal.module.css'

function RemoveConfirmationModal() {
  const {removeOrder} = useOrder();
  const {orderToRemove} = useOrder();
  const {setOrderToRemove} = useOrder();

  return (
    <div className={styles.container}>
      <div className={styles.removeConfirmationModal}>
        <div className={`noto-sans-jp-400 ${styles.messageContainer}`}>
          選択した注文を削除しますか？
        </div>
        <div className={styles.buttonsContainer}>
          <div className={styles.buttonContainer}>
            <button onClick={(e) => setOrderToRemove(null)} className={styles.cancelButton}>
              キャンセル
            </button>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={(e) => removeOrder(orderToRemove!)} className={styles.removeButton}>
              削除
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveConfirmationModal
