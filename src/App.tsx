import styles from './App.module.css'
import { useState } from 'react'
import { useEffect } from 'react';

function App() {
  const [isFlipped, setIsFlipped] = useState(false);

  const linkToMenu = () => {
    setIsFlipped(true);
    setTimeout(() => {
      window.location.href = '/menu';
    }, 1300);
  }

  return (
    <div className={`noto-sans-jp-500 ${styles.bodyStyle}`}>
      <div className={`${styles.bookContainer}`}>
          {/* 各ページ */}
          <div className={styles.page} id="page1" style={{transform: isFlipped ? 'rotateY(-180deg)' : '', zIndex: isFlipped ? 3 : 2}} >
              <button onClick={(e) => linkToMenu()} className={styles.pageFront}>
                <div className={styles.bookCover}>
                  <div />
                  <div className={styles.labelContainer}>
                    <div className={`caveat-700 ${styles.label}`}>Cafe Scraps</div>
                  </div>
                  <div/>
                </div>
              </button>
              <div className={styles.pageBack}>
                <div className={styles.page1BackContainer}>
                  <div className={styles.page1BackContent}>
                  </div>
                </div>
              </div>
          </div>

          <div className={styles.page} id="page2" style={{zIndex: 1}}>
              <div className={styles.pageFront}>
                <div className={styles.page2FrontContainer}>
                  <div className={styles.page2FrontContent1}>
                    <div className={styles.page2FrontContent2}>
                      <div className={`sedgwick-ave-regular ${styles.text}`}>Menu →</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.pageBack}><h2>４ページ目</h2><p>３ページ目の裏側です。</p></div>
          </div>
      </ div>
      {/* <div style={{marginTop: '20px'}}></div> */}
      <div style={{fontSize: 'max(16px, 2.73vw)'}}>
        ▲ タップでメニュー画面へ
      </div>
    </div>
  )
}

export default App
