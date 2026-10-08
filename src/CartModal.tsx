import React from 'react'
import { Link } from 'react-router'
import { useOrder } from './OrderContext'
import styles from './CartModal.module.css'
import OrderList from './OrderList'
import RemoveConfirmationModal from './RemoveConfirmationModal'

function CartModal() {
  const {orderToRemove} = useOrder();
  const {orders} = useOrder();
  const isOrdersEmpty = orders.length != 0;
  const {totalAmount} = useOrder();

  return (
    <div>
      <div className={`modal fade`} id='cartModal' data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby='CartModal' aria-hidden="true">
        <div className={`modal-dialog modal-dialog-centered modal-lg`}>
          <div className={`modal-content ${styles.glassMorphism}`}>
            <div className={styles.header}>
              <div />
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className={styles.orderListContainer}>
              <OrderList />
            </div>
            <div className={styles.totalAmountAndButtonsContainer}>
              <div className={styles.itemContainer}>
                <div className={`dela-gothic-one-regular ${styles.totalAmount}`}>
                  ￥{totalAmount}
                </div>
              </div>
              <div className={styles.itemContainer}>
                <button type='button' className={styles.closeButton} data-bs-dismiss='modal'>
                  閉じる
                </button>
              </div>
              <Link to='/register' className={styles.itemContainer}>
                <button type='button' disabled={!isOrdersEmpty} className={styles.registerButton} data-bs-dismiss='modal'>
                  レジへ進む
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {orderToRemove &&
        <RemoveConfirmationModal />
      }
    </div>
  )
}

export default CartModal
