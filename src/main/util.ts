/* eslint import/prefer-default-export: off, import/no-mutable-exports: off */
// import { URL } from 'url';
// import path from 'path';

export let resolveHtmlPath: (htmlFileName: string) => string;

if (process.env.NODE_ENV === 'development') {
  // const port = process.env.PORT || 1212;

  resolveHtmlPath = () => {
    // const url = new URL(`http://localhost:${port}`);

    // url.pathname = htmlFileName;
    // return url.href;

    return 'https://myqa.fleksa.com';
  };
} else {
  resolveHtmlPath = () => {
    return 'https://my.fleksa.com';
  };
}
