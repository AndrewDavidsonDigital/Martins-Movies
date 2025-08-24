import classNames from 'classnames';

declare global {
  var cn: (...inputs: classNames.Argument[]) => string;
}

export {};
