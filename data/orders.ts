import dayjs from 'dayjs';
import { dummyProduct } from './dummy';
import { Order } from '@/types/types';


const now = dayjs();

const orders: Order[] = [
  {
    id: 23123,
    created_at: now.subtract(1, 'hour').toISOString(),
    total: 31.4,
    status: 'Cooking',
    user_id: '1',
    order_items: [
      {
        id: 1,
        order_id: 23123,
        quantity: 2,
        product_id: dummyProduct[0].id,
        products: dummyProduct[0],
      },
      {
        id: 2,
        order_id: 23123,
        quantity: 1,
        product_id: dummyProduct[1].id,
        products: dummyProduct[1],
      },
    ],
  },
  {
    id: 32145,
    created_at: now.subtract(3, 'days').toISOString(),
    total: 11.4,
    status: 'Delivered',
    user_id: '1',
    order_items: [
      {
        id: 1,
        order_id: 32145,
        quantity: 2,
        product_id: dummyProduct[3].id,
        products: dummyProduct[3],
      },
    ],
  },
  {
    id: 23445,
    created_at: now.subtract(3, 'weeks').toISOString(),
    total: 11.4,
    status: 'Delivered',
    user_id: '1',
    order_items: [
      {
        id: 1,
        order_id: 23445,
        quantity: 1,
        product_id: dummyProduct[3].id,
        products: dummyProduct[3],
      },
    ],
  },
];

export default orders;