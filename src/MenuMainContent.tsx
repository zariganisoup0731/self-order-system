import React from 'react'
import styles from './MenuMainContent.module.css'
import type { MainContentIds } from './Menu';
import Category from './Category';
import MenuCardList from './MenuCardList';

type Props = {
  mainContentIds: MainContentIds;
}

function MenuMainContent(props: Props) {
  const {mainContentIds} = props;
  const stickerName: string[] = ['Recommendation', 'Drink', 'Food'];
  const categories: string[] = ['recommendation', 'drink', 'food'];
  return (
    <div className='tab-content'>
      <div className={`tab-pane show active`} id={mainContentIds.ids[0]} role='tabpanel' aria-labelledby={mainContentIds.ariaLabel[0]} tabIndex={0}>
        {/* <Category name = {stickerName[1]} /> */}
      </div>
      <div className={`tab-pane`} id={mainContentIds.ids[1]} role='tabpanel' aria-labelledby={mainContentIds.ariaLabel[1]} tabIndex={0}>
        <Category name = {stickerName[1]} />
        <MenuCardList category={categories[1]} />
        <Category name = {stickerName[2]} />
        <MenuCardList category={categories[2]}/>
      </div>
      <div className={`tab-pane`} id={mainContentIds.ids[2]} role='tabpanel' aria-labelledby={mainContentIds.ariaLabel[2]} tabIndex={0}>
        <Category name = {stickerName[1]} />
        <MenuCardList category={categories[1]}/>
      </div>
      <div className={`tab-pane`} id={mainContentIds.ids[3]} role='tabpanel' aria-labelledby={mainContentIds.ariaLabel[3]} tabIndex={0}>
        <Category name = {stickerName[2]} />
        <MenuCardList category={categories[2]}/>
      </div>
    </div>
  )
}

export default MenuMainContent
