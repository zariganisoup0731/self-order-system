import React from 'react'
import styles from './ProgressBar.module.css'
import { useOrder } from './OrderContext'


function ProgressBar() {
  const {progress} = useOrder();
  return (
    <div className="progress" style={{width: '80%', height: '10%'}} role="progressbar">
      <div className="progress-bar" style={{width: `${progress}%`}}></div>
      <div className={styles.stepsContainer}>
        <div className={styles[`step1-${progress}`]}>
          <i className={`bi bi-cart`}></i>
        </div>
        <div className={styles[`step2-${progress}`]}>
          <i className={`bi bi-cart-check`}></i>
        </div>
        <div className={styles[`step3-${progress}`]}>
          <i className={`bi bi-cup-hot`}></i>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
