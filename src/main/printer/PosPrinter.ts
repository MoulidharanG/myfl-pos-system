/* eslint-disable no-underscore-dangle */
import log from 'electron-log';
import moment from 'moment';
import { printer as ThermalPrinter } from 'node-thermal-printer';
import {
  IPrintReceiptData,
  IPrintReceiptOrderData,
} from '../../interface/renderer';

declare enum PrinterTypes {
  EPSON = 'epson',
  STAR = 'star',
}

interface IConfig {
  interface: string;
  type?: PrinterTypes;
  width?: number;
  characterSet?: string;
  lineCharacter?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  driver?: Object;
  removeSpecialCharacters?: boolean;
  options?: {
    timeout?: number;
  };
}

class Printer {
  private printerConfig: IConfig;

  private orderData: IPrintReceiptOrderData;

  constructor(config: IConfig, data: IPrintReceiptData) {
    this.printerConfig = config;
    this.orderData = data.order;
  }

  // ? makeing printable a string line by line
  getPrintableLines = (name: string) => {
    const words = name.split(' ');

    const lines: string[] = [];

    let successWord = '';

    for (let i = 0; i <= words.length; i += 1) {
      if (successWord.length >= 10 && !!successWord) {
        // remove space end
        if (successWord[successWord.length - 1] === ' ') {
          successWord = successWord.slice(0, successWord.length - 1);
        }

        lines.push(successWord);
        successWord = '';
      }

      successWord += words[i] ? `${words[i]} ` : '';

      // ? Edge case
      if (words.length === i) {
        // remove space end
        if (successWord[successWord.length - 1] === ' ') {
          successWord = successWord.slice(0, successWord.length - 1);
        }

        lines.push(successWord);
      }
    }

    return lines.filter(String); // ? Emit only string
  };

  async init() {
    try {
      const printer = new ThermalPrinter(this.printerConfig as IConfig);

      const underline = (noDash: number) => {
        printer.bold(true);
        printer.println('-'.repeat(1 * noDash));
        printer.bold(false);
      };

      const isConnected = await printer.isPrinterConnected();
      log.info('status conenction', isConnected ? '😃 oK' : '😓 wrong!');

      // ? default setting
      printer.alignCenter();
      printer.underlineThick(false);
      printer.bold(false);
      printer.setCharacterSet('PC858_EURO');

      printer.setTextSize(1, 1);

      this.getPrintableLines(this.orderData.details?.shop.name).forEach(
        (line) => {
          printer.println(line);
        },
      );

      const { location } = this.orderData.details.shop;

      printer.setTextSize(0, 0);
      printer.println(`${location.area} ${location.address}`);
      printer.println(`${location.postal_code} ${location.city}`);

      printer.newLine();

      printer.setTextSize(1, 1);

      printer.bold(true);
      printer.println(`${this.orderData.details.order.id}`);
      printer.bold(false);

      printer.setTextSize(0, 0);

      printer.println(
        moment(this.orderData.details.order.created_at).format(
          'DD. MMM. YYYY HH:MM',
        ),
      );

      underline(32);

      printer.setTextSize(1, 1);
      printer.bold(true);
      // eslint-disable-next-line no-underscore-dangle
      printer.println(this.orderData.details.order.order_type_);
      printer.bold(false);
      printer.setTextSize(0, 0);

      const wantAt = moment(this.orderData.details.order.want_at);
      printer.println(
        !this.orderData.details.order.is_pre_order
          ? wantAt.format('DD. MMM. YYYY HH:MM')
          : `${wantAt.format('DD. MMM. YYYY')} ca. ${wantAt.format('HH:MM')}`,
      );
      printer.newLine();

      printer.bold(true);
      // eslint-disable-next-line no-underscore-dangle
      printer.println(this.orderData.details.order.payment_method);
      printer.bold(false);

      underline(32);

      printer.alignLeft();

      printer.bold(true);
      printer.println('KUNDENDATEN');
      printer.println(this.orderData.details.order.name);
      printer.bold(false);

      printer.println(
        `+${this.orderData.details.order.country_code}${this.orderData.details.order.phone}`,
      );

      underline(32);

      printer.println('BESTELLUBERSICHT');
      printer.newLine();

      this.orderData.details.items.forEach((product) => {
        printer.underlineThick(true);
        printer.bold(true);

        // ? for single type product
        if (product.type_ === 'SINGLE') {
          printer.println(
            product.name_json
              ?.filter((name) => name.isRoot)
              .map((p) => p.name.english)
              .join(' '),
          );
        } else if (product.type_ === 'PART') {
          printer.println(
            `${product.name_json
              ?.filter((name) => name.isRoot && name.type === 'PART-PARENT')
              .map((p) => p.name.english)
              .join('')}(${product.name_json
              ?.filter((name) => name.isRoot && name.type === 'PART')
              .map((p) => p.name.english)
              .join('')})`,
          );
        }
        printer.bold(false);
        printer.underlineThick(false);

        /// ? For options
        product.name_json.forEach((p) => {
          if (p.type === 'CHOICE') {
            printer.println(`+ ${p.name.english}`);
          }
        });

        // ? For sides
        product.name_json.forEach((p) => {
          if (p.type === 'SIDE') {
            printer.println(`+ ${p.name.english}`);
          }
        });

        printer.tableCustom([
          // Prints table with custom settings (text, align, width, cols, bold)
          {
            text: `${product.quantity}x €${product.price
              .toFixed(2)
              .replace('.', ',')}`,
            align: 'LEFT',
            width: 0.5,
          },
          {
            text: `€${product.price.toFixed(2).replace(',', '.')}`,
            align: 'RIGHT',
            cols: 8,
            bold: true,
          },
        ]);
      });

      underline(32);

      // ? Print subtotal and total
      [
        {
          text: 'ZWISCHENSUMME',
          price: `€${this.orderData.details.order.sub_total_amount
            ?.toFixed(2)
            ?.replace('.', ',')}`,
          isShow: true,
        },
        {
          text: 'TRINKGELD',
          price: `€${this.orderData.details.order?.tip
            ?.toFixed(2)
            ?.replace('.', ',')}`,
          isShow: this.orderData.details.order?.tip > 0,
        },
        {
          text: 'LIEFERKOSTEN',
          price: `€${this.orderData.details.order?.fee
            ?.toFixed(2)
            ?.replace('.', ',')}`,
          isShow: this.orderData.details.order?.fee > 0,
        },
        {
          text: 'RABATT',
          price: `€${this.orderData.details.order?.discount
            ?.toFixed(2)
            ?.replace('.', ',')}`,
          isShow: this.orderData.details.order?.discount > 0,
        },
        {
          text: 'GESAMT',
          price: `€${this.orderData.details.order.total_amount
            ?.toFixed(2)
            ?.replace('.', ',')}`,
          isShow: true,
        },
      ].forEach((row) => {
        if (row.isShow)
          printer.tableCustom([
            // Prints table with custom settings (text, align, width, cols, bold)
            { text: row.text, align: 'LEFT', width: 0.5 },
            {
              text: row.price,
              align: 'RIGHT',
              cols: 8,
              bold: true,
            },
          ]);
      });

      underline(32);

      printer.newLine();
      printer.newLine();
      printer.newLine();

      await printer.execute();
      log.info('Print done!');

      return {
        isPrint: true,
        message: 'Print done',
      };
    } catch (error) {
      log.error('Print failed:', error);

      throw new Error((error as Error)?.message ?? 'Print failed');
    }
  }
}

export default Printer;
