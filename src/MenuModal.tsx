import { useState } from 'react';
import { useOrder } from './OrderContext';
import type { MenuModalInfo } from './Menu';
import type { Order } from './OrderContext';
import styles from './MenuModal.module.css'
import arrow from './assets/cardArrow.png'
import dripCoffeeSticker from './assets/dripcoffeeSticker.png'
import viennaCoffeeSticker from './assets/viennacoffeeSticker.png'
import espressoSticker from './assets/espressoSticker.png'
import macchiatoSticker from './assets/macchiatoSticker.png'
import cappuccinoSticker from './assets/cappuccinoSticker.png'
import latteSticker from './assets/latteSticker.png'
import matchaLatteSticker from './assets/matchalatteSticker.png'
import milkSticker from './assets/milkSticker.png'
import orangeJuiceSticker from './assets/orangejuiceSticker.png'
import clubSandwichSticker from './assets/clubsandwichSticker.png'
import cookieSticker from './assets/cookieSticker.png'
import sconeSticker from './assets/sconeSticker.png'

type Props = {
  menuModalInfo: MenuModalInfo;
}

type CartModalInfo = {
  imgSrc: string,
  imgHeight: string,
  imgTransform: string
}

type CartModalInfoMap = {
  DripCoffee: CartModalInfo,
  ViennaCoffee: CartModalInfo,
  Espresso: CartModalInfo,
  Macchiato: CartModalInfo,
  Cappuccino: CartModalInfo,
  Latte: CartModalInfo,
  MatchaLatte: CartModalInfo,
  Milk: CartModalInfo,
  OrangeJuice: CartModalInfo,
  ClubSandwich: CartModalInfo,
  Cookie: CartModalInfo,
  Scone: CartModalInfo
}

function MenuModal(props: Props) {
  const {menuModalInfo} = props;

  const [temperature, setTemperature] = useState(() => {
    if(menuModalInfo.temperature === 'hotOnly') return 'Hot';
    if(menuModalInfo.temperature === 'icedOnly') return 'Iced';
    return '';
  });
  const [heatUp, setHeatUp] = useState('');
  const [size, setSize] = useState(() => {
    if(menuModalInfo.category === 'food') return 'oneSize';
    return '';
  });
  const [price, setPrice] = useState(() => {
    if(menuModalInfo.category === 'food') return menuModalInfo.prices[0];
    return 0;
  });
  const setSizeAndPrice = (value: string) => {
    setSize(value);
    switch(value) {
      case 'S':
        setPrice(menuModalInfo.prices[0]);
        break;
      case 'M':
        setPrice(menuModalInfo.prices[1]);
        break;
      case 'L':
        setPrice(menuModalInfo.prices[2]);
        break;
      default:
        break;
    }
  }
  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 99));
  const decrement = () => setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));

  const generateID = (): string => {
    if(menuModalInfo.category === 'drink') return `${menuModalInfo.name}_${temperature}_${size}`
    return `${menuModalInfo.name}_${heatUp}`
  }

  const resetOrder = () => {
    setTemperature(() => {
      if(menuModalInfo.temperature === 'hotOnly') return 'Hot';
      if(menuModalInfo.temperature === 'icedOnly') return 'Iced';
      return '';
    });
    setHeatUp('');
    setSize(() => {
      if(menuModalInfo.category === 'food') return 'oneSize'
      return ''
    });
    setPrice(() => {
      if(menuModalInfo.category === 'food') return menuModalInfo.prices[0];
      return 0;
    });
    setQuantity(1);
  }

  const cartModalInformations: CartModalInfoMap = {
    DripCoffee: {imgSrc: dripCoffeeSticker, imgHeight: 'max(67.5px, 13.18vw)', imgTransform: 'translate(0px, -0.78vw)'},
    ViennaCoffee: {imgSrc: viennaCoffeeSticker, imgHeight: 'max(65px, 12.7vw)', imgTransform: 'translate(0px, -0.78vw)'},
    Espresso: {imgSrc: espressoSticker, imgHeight: 'max(40px, 7.81vw)', imgTransform: 'translate(0px, 0px)'},
    Macchiato: {imgSrc: macchiatoSticker, imgHeight: 'max(50px, 9.77vw)', imgTransform: 'translate(0px, 0px)'},
    Cappuccino: {imgSrc: cappuccinoSticker, imgHeight: 'max(75px, 14.65vw)', imgTransform: 'translate(0px, max(-1.46vw))'},
    Latte: {imgSrc: latteSticker, imgHeight: 'max(52.5px, 10.25vw)', imgTransform: 'translate(0px, -0.49vw)'},
    MatchaLatte: {imgSrc: matchaLatteSticker, imgHeight: 'max(75px, 14.65vw)', imgTransform: 'translate(-0.49vw, -0.49vw)'},
    Milk: {imgSrc: milkSticker, imgHeight: 'max(57.5px, 11.23vw)', imgTransform: 'translate(0px, max(0px))'},
    OrangeJuice: {imgSrc: orangeJuiceSticker, imgHeight: 'max(55px, 10.74vw)', imgTransform: 'translate(0px, max(0px))'},
    ClubSandwich: {imgSrc: clubSandwichSticker, imgHeight: 'max(57.5px, 11.23vw)', imgTransform: 'translate(0px, max(0px))'},
    Cookie: {imgSrc: cookieSticker, imgHeight: 'max(57.5px, 11.23vw)', imgTransform: 'translate(0px, max(0px))'},
    Scone: {imgSrc: sconeSticker, imgHeight: 'max(62.5px, 12.2vw)', imgTransform: 'translate(0px, max(0px))'}
  }

  const order: Order = {
    id: generateID(),
    category: menuModalInfo.category,
    name: menuModalInfo.name,
    imgSrc: cartModalInformations[menuModalInfo.name as keyof CartModalInfoMap].imgSrc,
    imgHeight: cartModalInformations[menuModalInfo.name as keyof CartModalInfoMap].imgHeight,
    imgTransform: cartModalInformations[menuModalInfo.name as keyof CartModalInfoMap].imgTransform,
    temperature: temperature,
    heatUp: heatUp,
    size: size,
    price: price,
    quantity: quantity
  }

  const {addOrder} = useOrder();
  const isDrinkOrderValid = temperature != '' && size != "";
  const isFoodOrderValid = heatUp != '';
  const addOrderToCart = () => {
    addOrder(order);
    resetOrder();
  }

  if(order.category === 'drink') {
    if(menuModalInfo.temperature === 'hotAndIced') {
      return (
        <div className="modal fade" id={`${menuModalInfo.name}MenuModal`} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby={`${menuModalInfo.name}MenuModal`} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content" style={{backgroundColor: '#28e407'}}>
              <div className={styles.header}>
                <div />
                <div className={styles.arrowContainer}>
                  <img src={arrow} style={{height: 'max(15px, 2.44vw)'}}/>
                </div>
                <div className={`inter-600 ${styles.cardNameContainer}`}>
                  <div className={styles.cardName}>
                    CAFE SCRAPS
                  </div>
                </div>
                <button type="button" onClick={resetOrder} className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{backgroundColor: '#ffffff'}} />
              </div>
              <div className={styles.mainContentsContainer}>
                <div />
                <div className={`merchant-font ${styles.menuContainer}`}>
                  <div />
                  <div className={styles.imgContainer}>
                    <img src={menuModalInfo.imgSrc} style={{width: `${menuModalInfo.imgWidth}`, transform: `${menuModalInfo.imgTransform}`}} />
                  </div>
                  <div className={styles.nameContainer}>{menuModalInfo.name}</div>
                </div>
                <div />
                <div className={styles.optionButtonsContainer}>
                  <div className={styles.captionAndButtonContainer}>
                    <div className={`noto-sans-jp-500 ${styles.caption}`}>Hot/Iced</div>
                    <div className={styles.buttonContainer1}>
                      <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{backgroundColor: "#FFFFFF"}}>
                        <input type="radio" value='Hot' checked={temperature === 'Hot'} onChange={(e) => setTemperature(e.target.value)} className="btn-check" name={`${menuModalInfo.name}HotIcedButtons`} id={`${menuModalInfo.name}HotButton`} autoComplete="off" />
                        <label className="btn btn-outline-danger noto-sans-jp-100" htmlFor={`${menuModalInfo.name}HotButton`}>Hot</label>

                        <input type="radio" value='Iced' checked={temperature === 'Iced'} onChange={(e) => setTemperature(e.target.value)} className="btn-check" name={`${menuModalInfo.name}HotIcedButtons`} id={`${menuModalInfo.name}IcedButton`} autoComplete="off" />
                        <label className="btn btn-outline-primary noto-sans-jp-100" htmlFor={`${menuModalInfo.name}IcedButton`}>Iced</label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.captionAndButtonContainer}>
                    <div className={`noto-sans-jp-500 ${styles.caption}`}>サイズ</div>
                    <div className={styles.buttonContainer1}>
                      <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{backgroundColor: "#FFFFFF"}}>
                        <input type="radio" value='S' checked={size === 'S'} onChange={(e) => setSizeAndPrice(e.target.value)} className="btn-check" name={`${menuModalInfo.name}SizeButtons`} id={`${menuModalInfo.name}SButton`} autoComplete="off" />
                        <label className="btn btn-outline-dark noto-sans-jp-100" htmlFor={`${menuModalInfo.name}SButton`}>
                          <div>S</div>
                          <div>￥{menuModalInfo.prices[0]}</div>
                        </label>

                        <input type="radio" value='M' checked={size === 'M'} onChange={(e) => setSizeAndPrice(e.target.value)} className="btn-check" name={`${menuModalInfo.name}SizeButtons`} id={`${menuModalInfo.name}MButton`} autoComplete="off" />
                        <label className="btn btn-outline-dark noto-sans-jp-100" htmlFor={`${menuModalInfo.name}MButton`}>
                          <div>M</div>
                          <div>￥{menuModalInfo.prices[1]}</div>
                        </label>

                        <input type="radio" value='L' checked={size === 'L'} onChange={(e) => setSizeAndPrice(e.target.value)} className="btn-check" name={`${menuModalInfo.name}SizeButtons`} id={`${menuModalInfo.name}LButton`} autoComplete="off" />
                        <label className="btn btn-outline-dark noto-sans-jp-100" htmlFor={`${menuModalInfo.name}LButton`}>
                          <div>L</div>
                          <div>￥{menuModalInfo.prices[2]}</div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.captionAndButtonContainer}>
                    <div className={`noto-sans-jp-500 ${styles.caption}`}>数量</div>
                    <div className={styles.buttonContainer1}>
                      <div className={styles.buttonContainer2}>
                        <button type='button' onClick={decrement} className={styles.changeNumButton}>ー</button>
                        <div className={styles.quantityViewer}>{quantity}</div>
                        <button type='button' onClick={increment} className={styles.changeNumButton}>＋</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.cancelAndAddButtonContainer}>
                <div></div>
                <button type='button' onClick={resetOrder} className={styles.cancelButton} data-bs-dismiss="modal">キャンセル</button>
                <div></div>
                <button type='button' onClick={addOrderToCart} disabled={!isDrinkOrderValid} className={styles.addButton} data-bs-dismiss="modal">カートに追加</button>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if(menuModalInfo.temperature === 'hotOnly') {
      return (
        <div className="modal fade" id={`${menuModalInfo.name}MenuModal`} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby={`${menuModalInfo.name}MenuModal`} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content" style={{backgroundColor: '#28e407'}}>
              <div className={styles.header}>
                <div />
                <div className={styles.arrowContainer}>
                  <img src={arrow} style={{height: 'max(15px, 2.44vw)'}}/>
                </div>
                <div className={`inter-600 ${styles.cardNameContainer}`}>
                  <div className={styles.cardName}>
                    CAFE SCRAPS
                  </div>
                </div>
                <button type="button" onClick={resetOrder} className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{backgroundColor: '#ffffff'}} />
              </div>
              <div className={styles.mainContentsContainer}>
                <div />
                <div className={`merchant-font ${styles.menuContainer}`}>
                  <div />
                  <div className={styles.imgContainer}>
                    <img src={menuModalInfo.imgSrc} style={{width: `${menuModalInfo.imgWidth}`, transform: `${menuModalInfo.imgTransform}`}} />
                  </div>
                  <div className={styles.nameContainer}>{menuModalInfo.name}</div>
                </div>
                <div />
                <div className={styles.optionButtonsContainer}>
                  <div className={styles.captionAndButtonContainer}>
                    <div className={`noto-sans-jp-500 ${styles.caption}`}>Hot/Iced</div>
                    <div className={styles.buttonContainer1}>
                      <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{backgroundColor: "#FFFFFF"}}>
                        <input type="radio" value='Hot' checked={temperature === 'Hot'} className="btn-check" name={`${menuModalInfo.name}HotIcedButtons`} id={`${menuModalInfo.name}HotButton`} autoComplete="off" />
                        <label className="btn btn-outline-danger noto-sans-jp-100" htmlFor={`${menuModalInfo.name}HotButton`}>Hot</label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.captionAndButtonContainer}>
                    <div className={`noto-sans-jp-500 ${styles.caption}`}>サイズ</div>
                    <div className={styles.buttonContainer1}>
                      <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{backgroundColor: "#FFFFFF"}}>
                        <input type="radio" value='S' checked={size === 'S'} onChange={(e) => setSizeAndPrice(e.target.value)} className="btn-check" name={`${menuModalInfo.name}SizeButtons`} id={`${menuModalInfo.name}SButton`} autoComplete="off" />
                        <label className="btn btn-outline-dark noto-sans-jp-100" htmlFor={`${menuModalInfo.name}SButton`}>
                          <div>S</div>
                          <div>￥{menuModalInfo.prices[0]}</div>
                        </label>

                        <input type="radio" value='M' checked={size === 'M'} onChange={(e) => setSizeAndPrice(e.target.value)} className="btn-check" name={`${menuModalInfo.name}SizeButtons`} id={`${menuModalInfo.name}MButton`} autoComplete="off" />
                        <label className="btn btn-outline-dark noto-sans-jp-100" htmlFor={`${menuModalInfo.name}MButton`}>
                          <div>M</div>
                          <div>￥{menuModalInfo.prices[1]}</div>
                        </label>

                        <input type="radio" value='L' checked={size === 'L'} onChange={(e) => setSizeAndPrice(e.target.value)} className="btn-check" name={`${menuModalInfo.name}SizeButtons`} id={`${menuModalInfo.name}LButton`} autoComplete="off" />
                        <label className="btn btn-outline-dark noto-sans-jp-100" htmlFor={`${menuModalInfo.name}LButton`}>
                          <div>L</div>
                          <div>￥{menuModalInfo.prices[2]}</div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.captionAndButtonContainer}>
                    <div className={`noto-sans-jp-500 ${styles.caption}`}>数量</div>
                    <div className={styles.buttonContainer1}>
                      <div className={styles.buttonContainer2}>
                        <button type='button' onClick={decrement} className={styles.changeNumButton}>ー</button>
                        <div className={styles.quantityViewer}>{quantity}</div>
                        <button type='button' onClick={increment} className={styles.changeNumButton}>＋</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.cancelAndAddButtonContainer}>
                <div></div>
                <button type='button' onClick={resetOrder} className={styles.cancelButton} data-bs-dismiss="modal">キャンセル</button>
                <div></div>
                <button type='button' onClick={addOrderToCart} disabled={!isDrinkOrderValid} className={styles.addButton} data-bs-dismiss="modal">カートに追加</button>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if(menuModalInfo.temperature === 'icedOnly') {
      return (
        <div className="modal fade" id={`${menuModalInfo.name}MenuModal`} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby={`${menuModalInfo.name}MenuModal`} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content" style={{backgroundColor: '#28e407'}}>
              <div className={styles.header}>
                <div />
                <div className={styles.arrowContainer}>
                  <img src={arrow} style={{height: 'max(15px, 2.44vw)'}}/>
                </div>
                <div className={`inter-600 ${styles.cardNameContainer}`}>
                  <div className={styles.cardName}>
                    CAFE SCRAPS
                  </div>
                </div>
                <button type="button" onClick={resetOrder} className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{backgroundColor: '#ffffff'}} />
              </div>
              <div className={styles.mainContentsContainer}>
                <div />
                <div className={`merchant-font ${styles.menuContainer}`}>
                  <div />
                  <div className={styles.imgContainer}>
                    <img src={menuModalInfo.imgSrc} style={{width: `${menuModalInfo.imgWidth}`, transform: `${menuModalInfo.imgTransform}`}} />
                  </div>
                  <div className={styles.nameContainer}>{menuModalInfo.name}</div>
                </div>
                <div />
                <div className={styles.optionButtonsContainer}>
                  <div className={styles.captionAndButtonContainer}>
                    <div className={`noto-sans-jp-500 ${styles.caption}`}>Hot/Iced</div>
                    <div className={styles.buttonContainer1}>
                      <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{backgroundColor: "#FFFFFF"}}>
                        <input type="radio" value='Iced' checked={temperature === 'Iced'} className="btn-check" name={`${menuModalInfo.name}HotIcedButtons`} id={`${menuModalInfo.name}IcedButton`} autoComplete="off" />
                        <label className="btn btn-outline-primary noto-sans-jp-100" htmlFor={`${menuModalInfo.name}IcedButton`}>Iced</label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.captionAndButtonContainer}>
                    <div className={`noto-sans-jp-500 ${styles.caption}`}>サイズ</div>
                    <div className={styles.buttonContainer1}>
                      <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{backgroundColor: "#FFFFFF"}}>
                        <input type="radio" value='S' checked={size === 'S'} onChange={(e) => setSizeAndPrice(e.target.value)} className="btn-check" name={`${menuModalInfo.name}SizeButtons`} id={`${menuModalInfo.name}SButton`} autoComplete="off" />
                        <label className="btn btn-outline-dark noto-sans-jp-100" htmlFor={`${menuModalInfo.name}SButton`}>
                          <div>S</div>
                          <div>￥{menuModalInfo.prices[0]}</div>
                        </label>

                        <input type="radio" value='M' checked={size === 'M'} onChange={(e) => setSizeAndPrice(e.target.value)} className="btn-check" name={`${menuModalInfo.name}SizeButtons`} id={`${menuModalInfo.name}MButton`} autoComplete="off" />
                        <label className="btn btn-outline-dark noto-sans-jp-100" htmlFor={`${menuModalInfo.name}MButton`}>
                          <div>M</div>
                          <div>￥{menuModalInfo.prices[1]}</div>
                        </label>

                        <input type="radio" value='L' checked={size === 'L'} onChange={(e) => setSizeAndPrice(e.target.value)} className="btn-check" name={`${menuModalInfo.name}SizeButtons`} id={`${menuModalInfo.name}LButton`} autoComplete="off" />
                        <label className="btn btn-outline-dark noto-sans-jp-100" htmlFor={`${menuModalInfo.name}LButton`}>
                          <div>L</div>
                          <div>￥{menuModalInfo.prices[2]}</div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.captionAndButtonContainer}>
                    <div className={`noto-sans-jp-500 ${styles.caption}`}>数量</div>
                    <div className={styles.buttonContainer1}>
                      <div className={styles.buttonContainer2}>
                        <button type='button' onClick={decrement} className={styles.changeNumButton}>ー</button>
                        <div className={styles.changeNumButton}>{quantity}</div>
                        <button type='button' onClick={increment} className={styles.changeNumButton}>＋</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.cancelAndAddButtonContainer}>
                <div></div>
                <button type='button' onClick={resetOrder} className={styles.cancelButton} data-bs-dismiss="modal">キャンセル</button>
                <div></div>
                <button type='button' onClick={addOrderToCart} disabled={!isDrinkOrderValid} className={styles.addButton} data-bs-dismiss="modal">カートに追加</button>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  } else if(order.category === 'food') {
    return (
      <div className="modal fade" id={`${menuModalInfo.name}MenuModal`} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby={`${menuModalInfo.name}MenuModal`} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content" style={{backgroundColor: '#28e407'}}>
            <div className={styles.header}>
              <div />
              <div className={styles.arrowContainer}>
                <img src={arrow} style={{height: 'max(15px, 2.44vw)'}}/>
              </div>
              <div className={`inter-600 ${styles.cardNameContainer}`}>
                <div className={styles.cardName}>
                  CAFE SCRAPS
                </div>
              </div>
              <button type="button" onClick={resetOrder} className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{backgroundColor: '#ffffff'}} />
            </div>
            <div className={styles.mainContentsContainer}>
              <div />
              <div className={`merchant-font ${styles.menuContainer}`}>
                <div />
                <div className={styles.imgContainer}>
                  <img src={menuModalInfo.imgSrc} style={{width: `${menuModalInfo.imgWidth}`, transform: `${menuModalInfo.imgTransform}`}} />
                </div>
                <div className={styles.nameContainer}>{menuModalInfo.name}</div>
              </div>
              <div />
              <div className={styles.optionButtonsContainer}>
                <div className={styles.captionAndButtonContainer}>
                  <div className={`noto-sans-jp-500 ${styles.caption}`}>商品の温め</div>
                  <div className={styles.buttonContainer1}>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{backgroundColor: "#FFFFFF"}}>
                      <input type="radio" value='必要' checked={heatUp === '必要'} onChange={(e) => setHeatUp(e.target.value)} className="btn-check" name={`${menuModalInfo.name}HeatUpButtons`} id={`${menuModalInfo.name}NecessaryButton`} autoComplete="off" />
                      <label className="btn btn-outline-danger noto-sans-jp-100" htmlFor={`${menuModalInfo.name}NecessaryButton`}>必要</label>

                      <input type="radio" value='不要' checked={heatUp === '不要'} onChange={(e) => setHeatUp(e.target.value)} className="btn-check" name={`${menuModalInfo.name}HeatUpButtons`} id={`${menuModalInfo.name}UnnecessaryButton`} autoComplete="off" />
                      <label className="btn btn-outline-dark noto-sans-jp-100" htmlFor={`${menuModalInfo.name}UnnecessaryButton`}>不要</label>
                    </div>
                  </div>
                </div>
                <div className={styles.captionAndButtonContainer}>
                  <div className={`noto-sans-jp-500 ${styles.caption}`}>サイズ</div>
                  <div className={styles.buttonContainer1}>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{backgroundColor: "#FFFFFF"}}>
                      <input type="radio" value='oneSize' checked={size === 'oneSize'} className="btn-check" name={`${menuModalInfo.name}SizeButtons`} id={`${menuModalInfo.name}SButton`} autoComplete="off" />
                      <label className="btn btn-outline-dark noto-sans-jp-100" htmlFor={`${menuModalInfo.name}SButton`}>
                        <div>oneSize</div>
                        <div>￥{menuModalInfo.prices[0]}</div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className={styles.captionAndButtonContainer}>
                    <div className={`noto-sans-jp-500 ${styles.caption}`}>数量</div>
                    <div className={styles.buttonContainer1}>
                      <div className={styles.buttonContainer2}>
                        <button type='button' onClick={decrement} className={styles.changeNumButton}>ー</button>
                        <div className={styles.quantityViewer}>{quantity}</div>
                        <button type='button' onClick={increment} className={styles.changeNumButton}>＋</button>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <div className={styles.cancelAndAddButtonContainer}>
              <div></div>
              <button type='button' onClick={resetOrder} className={styles.cancelButton} data-bs-dismiss="modal">キャンセル</button>
              <div></div>
              <button type='button' onClick={addOrderToCart} disabled={!isFoodOrderValid} className={styles.addButton} data-bs-dismiss="modal">カートに追加</button>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MenuModal

