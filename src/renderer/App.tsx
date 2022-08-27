/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.png';
import { IPC_EVENTS } from '../constants';
import './styles/app.global.css';

const orderResponse = {
  category: 'success',
  description: 'Details gathered',
  details: {
    customer_address: null,
    items: [
      {
        choice: [
          {
            name_json: {
              english: 'Option 1 Prod 3',
              german: 'Option 1 Prod 3',
            },
            price: 5,
            product_index: 2,
            top_index: 0,
          },
          {
            name_json: {
              english: 'Option 2 Prod 3',
              german: 'Option 2 Prod 3',
            },
            price: 2,
            product_index: 2,
            top_index: 1,
          },
        ],
        discount: null,
        name_json: [
          {
            id: 25957,
            isRoot: true,
            name: {
              english: 'Single + options',
              german: 'Single + options',
            },
            type: 'SINGLE',
          },
          {
            isRoot: false,
            name: {
              english: 'Option 1 Prod 3',
              german: 'Option 1 Prod 3',
            },
            product_index: 2,
            top_index: 0,
            type: 'CHOICE',
          },
          {
            isRoot: false,
            name: {
              english: 'Option 2 Prod 3',
              german: 'Option 2 Prod 3',
            },
            product_index: 2,
            top_index: 1,
            type: 'CHOICE',
          },
        ],
        price: 17.0,
        product_id: 25957,
        quantity: 1,
        sku: '',
        tax: 7.0,
        type_: 'SINGLE',
      },
      {
        choice: [
          {
            name_json: {
              english: 'Choice 1 Option 1 prod 2',
              german: 'Choice 1 Option 1 prod 2',
            },
            price: 5,
            product_index: 1,
            top_index: 0,
          },
          {
            name_json: {
              english: 'Choice 1 Option 2 prod 2',
              german: 'Choice 1 Option 2 prod 2',
            },
            price: 2,
            product_index: 1,
            top_index: 1,
          },
        ],
        discount: null,
        name_json: [
          {
            id: 25963,
            isRoot: true,
            name: {
              english: 'multiple + choice + only options',
              german: 'multiple + choice + only options',
            },
            type: 'PART-PARENT',
          },
          {
            id: 25964,
            isRoot: true,
            name: {
              english: 'Choice 1',
              german: 'Choice 1',
            },
            type: 'PART',
          },
          {
            isRoot: false,
            name: {
              english: 'Choice 1 Option 1 prod 2',
              german: 'Choice 1 Option 1 prod 2',
            },
            product_index: 1,
            top_index: 0,
            type: 'CHOICE',
          },
          {
            isRoot: false,
            name: {
              english: 'Choice 1 Option 2 prod 2',
              german: 'Choice 1 Option 2 prod 2',
            },
            product_index: 1,
            top_index: 1,
            type: 'CHOICE',
          },
        ],
        price: 17.0,
        product_id: 25964,
        quantity: 1,
        sku: '',
        tax: 7.0,
        type_: 'PART',
      },
      {
        choice: [],
        discount: null,
        name_json: [
          {
            id: 25966,
            isRoot: true,
            name: {
              english: 'Multiple + Choice + only sides',
              german: 'Multiple + Choice + only sides',
            },
            type: 'PART-PARENT',
          },
          {
            id: 25967,
            isRoot: true,
            name: {
              english: 'Choice 1',
              german: 'Choice 1',
            },
            type: 'PART',
          },
          {
            extra_price: 0.6,
            id: 19597,
            isRoot: false,
            name: {
              english: 'mit Ei',
              german: 'mit Ei',
            },
            type: 'SIDE',
          },
          {
            extra_price: 1.2,
            id: 19599,
            isRoot: false,
            name: {
              english: 'mit Gyros',
              german: 'mit Gyros',
            },
            type: 'SIDE',
          },
        ],
        price: 11.8,
        product_id: 25967,
        quantity: 1,
        sku: '',
        tax: 7.0,
        type_: 'PART',
      },
      {
        choice: [
          {
            name_json: {
              english: 'ch 1 option 1 prod 1',
              german: 'ch 1 option 1 prod 1',
            },
            price: 5,
            product_index: 0,
            top_index: 0,
          },
          {
            name_json: {
              english: 'ch 1 option 2 prod 1',
              german: 'ch 1 option 2 prod 1',
            },
            price: 5,
            product_index: 0,
            top_index: 1,
          },
        ],
        discount: null,
        name_json: [
          {
            id: 25969,
            isRoot: true,
            name: {
              english: 'multiple + ch + op + sd',
              german: 'multiple + ch + op + sd',
            },
            type: 'PART-PARENT',
          },
          {
            id: 25970,
            isRoot: true,
            name: {
              english: 'Choice 1',
              german: 'Choice 1',
            },
            type: 'PART',
          },
          {
            isRoot: false,
            name: {
              english: 'ch 1 option 1 prod 1',
              german: 'ch 1 option 1 prod 1',
            },
            product_index: 0,
            top_index: 0,
            type: 'CHOICE',
          },
          {
            isRoot: false,
            name: {
              english: 'ch 1 option 2 prod 1',
              german: 'ch 1 option 2 prod 1',
            },
            product_index: 0,
            top_index: 1,
            type: 'CHOICE',
          },
          {
            extra_price: 0.6,
            id: 19597,
            isRoot: false,
            name: {
              english: 'mit Ei',
              german: 'mit Ei',
            },
            type: 'SIDE',
          },
          {
            extra_price: 1.2,
            id: 19599,
            isRoot: false,
            name: {
              english: 'mit Gyros',
              german: 'mit Gyros',
            },
            type: 'SIDE',
          },
        ],
        price: 21.8,
        product_id: 25970,
        quantity: 1,
        sku: '',
        tax: 7.0,
        type_: 'PART',
      },
    ],
    order: {
      amount_currency: 'EUR',
      country_code: 91,
      coupon_code: 'NIL',
      created_at: 'Mon, 14 Mar 2022 10:43:27 GMT',
      customer_id: 276,
      delivered_at: 'Mon, 14 Mar 2022 10:30:00 GMT',
      description: '',
      discount: 1.0,
      email: 'mohamed.jakkariya@fleksa.de',
      fee: 0.0,
      id: 2185,
      is_refunded: false,
      name: 'jack',
      notification_count: 0,
      order_type_: 'PICKUP',
      payment_method: 'CASH',
      phone: 9524369244,
      platform: 'WEB',
      shop_id: 5,
      status: 'PLACED',
      sub_total_amount: 67.6,
      tax: 4.73,
      tip: 2.0,
      total_amount: 67.6,
      want_at: 'Mon, 14 Mar 2022 10:30:00 GMT',
      is_pre_order: false,
    },
    transaction: null,
    shop: {
      name: 'Smart Pizza Rodgau',
      location: {
        address: '17',
        area: 'Bazeillesstra\u00dfe',
        city: 'M\u00fcnchen',
        country: 'Germany',
        floor: 'Hinterhaus, Dann/Tegeder',
        lat: 0.0,
        lon: 0.0,
        postal_code: '81669',
      },
    },
  },
  result: true,
};

const Home = () => {
  const [printerList, setPrinterList] = useState<string[]>([]);
  const [selectedPrinter, setSelectedPrinter] = useState(printerList?.[0]);
  const [isError, setIsError] = useState('');

  const handlePrintButtonClick = () => {
    window.electron.printerApi?.printRequest({
      order: orderResponse,
      targetPrinter: selectedPrinter,
    });
  };

  useEffect(() => {
    // ? Request
    window.electron.printerApi?.getPrinters();

    // ? Response listening
    window.electron.ipcRenderer?.on(
      IPC_EVENTS['print-getter-response'],
      (data: Electron.Event) => {
        const printerGetterRespons = (
          data as unknown as Array<Record<string, string>>
        ).map((p) => p.name);
        setPrinterList(printerGetterRespons);
        setSelectedPrinter(printerGetterRespons?.[0]);
      },
    );

    // ? Error Response listening
    window.electron.ipcRenderer?.on(
      IPC_EVENTS['print-error-response'],
      (data: Electron.Event) => {
        setIsError((data as unknown as Record<string, string>).message);

        setTimeout(() => {
          setIsError('');
        }, 3000);
      },
    );
  }, []);

  return (
    <div className="bg-yellow-50 flex flex-1 flex-col py-10 items-center gap-3">
      <div className="Hello mx-auto">
        <img width="200px" alt="icon" src={icon} />
      </div>

      <h1 className="text-center">Fleksa POS</h1>

      <div>
        {isError && <p className="text-center pb-4 text-red-500">{isError}</p>}

        <div className="flex flex-col">
          {printerList.map((printer) => (
            <div className="form-check cursor-pointer" key={printer}>
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name={selectedPrinter}
                value={printer}
                onChange={() => {
                  setSelectedPrinter(printer);
                }}
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor={printer}
              >
                {printer}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="shadow-lg border rounded-md">
        <button
          type="button"
          className="bg-white p-2"
          onClick={handlePrintButtonClick}
        >
          Print the receipt
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
