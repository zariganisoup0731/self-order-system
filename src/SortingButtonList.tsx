import React from 'react'
import type { SortingButtonContents } from './Menu';
import styles from './SortingButtonList.module.css'

type Props = {
  sortingButtonContents: SortingButtonContents;
}

function SortingButtonList(props: Props) {
  const {sortingButtonContents} = props;
  return (
    <div className={`sedgwick-ave-regular ${styles.sortingButtonList}`} role='tablist'>
      <button className={`active ${styles.sortingButton}`} id={sortingButtonContents.ids[0]} data-bs-toggle='tab' data-bs-target={sortingButtonContents.targetIds[0]} aria-selected='true'>
        <div className={`active ${styles.sortingButtonContent}`}>{sortingButtonContents.name[0]}</div>
      </button>
      <button className={styles.sortingButton} id={sortingButtonContents.ids[1]} data-bs-toggle='tab' data-bs-target={sortingButtonContents.targetIds[1]} aria-selected='false'>
        <div className={styles.sortingButtonContent}>{sortingButtonContents.name[1]}</div>
      </button>
      <button className={styles.sortingButton} id={sortingButtonContents.ids[2]} data-bs-toggle='tab' data-bs-target={sortingButtonContents.targetIds[2]} aria-selected='false'>
        <div className={styles.sortingButtonContent}>{sortingButtonContents.name[2]}</div>
      </button>
      <button className={styles.sortingButton} id={sortingButtonContents.ids[3]} data-bs-toggle='tab' data-bs-target={sortingButtonContents.targetIds[3]} aria-selected='false'>
        <div className={styles.sortingButtonContent}>{sortingButtonContents.name[3]}</div>
      </button>
    </div>
  )
}

export default SortingButtonList
