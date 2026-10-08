import { Link } from 'react-router'
import { useOrder } from './OrderContext'
import styles from './NavigationBar.module.css'
import cart from './assets/cart.png'


function NavigationBar() {
  const {orders} = useOrder();
  const isOrdersEmpty = orders.length == 0;
  const {totalAmount} = useOrder();
  const {totalQuantity} = useOrder();
  return (
    <div className={styles.navigationBarContainer}>
      <div className={`noto-sans-jp-200 ${styles.navigationBar}`}>
        <div />
        <div className={styles.navItem}>
          <button type='button' data-bs-toggle='modal' data-bs-target='#cartModal'>
            <img src={cart} className={styles.cartButton}>
            </img>
            <span className="position-absolute translate-middle badge rounded-pill bg-danger" style={{top: '26%', left: '75%'}}>
              {totalQuantity}
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
          カートを見る
        </div>
        <div className={styles.navItem}>
          <div className={`dela-gothic-one-regular ${styles.totalAmount}`}>￥{totalAmount}</div>
        </div>
        <div />
        <Link to='/' className={styles.navItem}>
          <button type='button' className={styles.backButton}>トップに戻る</button>
        </Link>
        <Link to='/register' className={styles.navItem}>
            <button type='button' disabled={isOrdersEmpty} className={styles.registerButton}>レジに進む</button>
        </Link>
      </div>
    </div>
  )
}

export default NavigationBar
