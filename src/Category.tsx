import React from 'react'
import styles from './Category.module.css'

type Props = {
  name: string;
}

function Category(props: Props) {
  return (
    <div className={`racing-sans-one-regular ${styles.categorySticker}`}>
      <div className={styles.categoryContents}>{props.name}</div>
    </div>
  )
}

export default Category
