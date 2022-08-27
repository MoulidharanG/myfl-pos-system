type ProductType = 'PART' | 'SINGLE' | 'PART-PARENT' | 'CHOICE' | 'SIDE';
type OrderType = 'DELIVERY' | 'DINE_IN' | 'PICKUP';
type PaymentType = 'PAYPAL' | 'STRIPE' | 'CASH';
type OrderPlatformType = 'WEB';
type PaymentStatusType = 'UNPAID' | 'PAID';
type ReceiverType = 'PAYPAL' | 'STRIPE' | 'CASH';
type StatusType =
  | 'INITIATE'
  | 'VERIFIED'
  | 'UNPAID'
  | 'PLACED'
  | 'PREPARING'
  | 'DONE';

interface IAddressObject {
  floor?: string;
  address?: string;
  area?: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  postal_code: string;
}

export interface IPrintReceiptOrderData {
  category: string;
  description: string;
  details: {
    customer_address: IAddressObject | null;
    items: {
      choice: Array<Record<string, string>>;
      discount: null;
      name_json: {
        id: number;
        isRoot: boolean;
        name: { english: string; german: string };
        type: ProductType;
      }[];

      price: number;
      product_id: number;
      quantity: number;
      sku: string;
      tax: number;
      type_: ProductType;
    }[];

    order: {
      amount_currency: 'EUR';
      country_code: number;
      coupon_code: string;
      created_at: Date;
      customer_id: number;
      delivered_at: Date;
      description: string;
      discount: number;
      email: string;
      fee: number;
      id: number;
      is_refunded: boolean;
      name: string;
      notification_count: number;
      order_type_: OrderType;
      payment_method: PaymentType;
      phone: number;
      platform: OrderPlatformType;
      shop_id: number;
      status: StatusType;
      sub_total_amount: number;
      tax: number;
      tip: number;
      total_amount: number;
      want_at: Date;

      is_pre_order: boolean;
    };
    transaction: {
      fee: number;
      is_refunded: null;
      receiver: ReceiverType;
      status: PaymentStatusType;
      transaction_id: string;
    } | null;
    shop: {
      name: string;
      location: IAddressObject;
    };
  };
  result: boolean;
}

export interface IPrintReceiptData {
  targetPrinter: string;
  order: IPrintReceiptOrderData;
}
