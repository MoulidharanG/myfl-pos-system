/* eslint-disable global-require */
import { getPrinters } from 'printer';
import { IPrintReceiptData } from '../../interface/renderer';
import Printer from './PosPrinter';

export const initPrinterService = async (receipt: IPrintReceiptData) => {
  return new Printer(
    {
      interface: `printer:${receipt.targetPrinter}`, // ? Printer interface
      driver: require('printer'),
    },
    receipt,
  ).init();
};

export const listAllPrinters = async () => {
  return getPrinters();
};
