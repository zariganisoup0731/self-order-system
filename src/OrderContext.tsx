import { createContext, useContext, useRef, useState, type ReactNode } from "react";

export type Order = {
  id: string,
  category: string,
  name: string,
  imgSrc: string,
  imgHeight: string,
  imgTransform: string,
  temperature: string,
  heatUp: string,
  size: string,
  price: number,
  quantity: number
}

type OrderContextType = {
  orders: Order[]
  orderToRemove: Order | null
  totalAmount: number
  totalQuantity: number
  progress: string
  howToUse: string
  payment: string
  orderNumber: number
  ready: string;
  addOrder: (order: Order) => void
  removeOrder: (order: Order) => void
  setOrderToRemove: (order: Order | null) => void
  setProgress: (progress: string) => void
  setHowToUse: (howToUse: string) => void
  setPayment: (payment: string) => void
  generateOrderNumber: () => void
  setReady: (ready: string) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function useOrder() {
  const context = useContext(OrderContext)
  if(!context) {
    throw new Error('useOrder must be used within a OrderProvider')
  }
  return context;
}

type OrderProviderProps = {
  children: ReactNode;
}

export function OrderProvider({children}: OrderProviderProps) {
  const [orders, setOrder] = useState<Order[]>([]);
  const [orderToRemove, setOrderToRemove] = useState<Order | null>(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [progress, setProgress] = useState('0');
  const [howToUse, setHowToUse] = useState('');
  const [payment, setPayment] = useState('');
  const [orderNumber, setOrderNumber] = useState(0);
  const [ready, setReady] = useState('');

  const calculateTotalAmount = (orders: Order[]) => {
    let price = 0;
    let quantity = 0;
    orders.forEach((order) => {
      quantity += order.quantity;
      price += order.price * order.quantity;
    })
    setTotalAmount(price);
    setTotalQuantity(quantity);
  }

  const addOrder = (order: Order) => {
    const ordersClone = structuredClone(orders);
    const sameOrderIndex = ordersClone.findIndex((orderClone) => orderClone.id === order.id);
    if(sameOrderIndex == -1) {
      ordersClone.push(order);
    } else {
      ordersClone[sameOrderIndex].quantity += order.quantity;
    }
    setOrder(ordersClone);
    calculateTotalAmount(ordersClone);
  }

  const removeOrder = (order: Order) => {
    const ordersClone = structuredClone(orders);
    const sameOrderIndex = ordersClone.findIndex((orderClone) => orderClone.id === order.id);
    ordersClone.splice(sameOrderIndex, 1);
    setOrder(ordersClone);
    setOrderToRemove(null);
    calculateTotalAmount(ordersClone);
  }

  const generateOrderNumber = () => {
    const randomNum = Math.floor(Math.random() * 899 + 100);
    setOrderNumber(randomNum);
  }

  const value = {
    orders,
    orderToRemove,
    totalAmount,
    totalQuantity,
    progress,
    howToUse,
    payment,
    orderNumber,
    ready,
    addOrder,
    removeOrder,
    setOrderToRemove,
    setProgress,
    setHowToUse,
    setPayment,
    generateOrderNumber,
    setReady
  }

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  )
}