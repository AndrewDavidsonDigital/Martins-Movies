import classNames from 'classnames';

declare global {
  var cn: (...inputs: classNames.Argument[]) => string;
}

/*
  Extend React's HTML attributes to include closedby for dialog elements
  only not supported by safari at this stage and not worth the time atm to 
  solve a custom solution / polyfill for it
*/
declare module 'react' {
  interface HTMLAttributes<T> {
    closedby?: string;
  }
}

export {};
