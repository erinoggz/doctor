import { IError, ISuccess } from '../common/IResponse';
import ResponseMessages from './response-messages';

export default class Helpers {
  /**
   * Checks if an object data is empty and returns.
   * @param  {object} obj - The object to check.
   * @return {boolean} - The result.
   */
  static isEmptyObject = (obj: object): boolean => {
    return (
      obj &&
      Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype
    );
  };

  /**
   * returns success data.
   * @param  {object} obj - The data.
   * @param  {string} message - success message.
   */
  static success = (
    data: object | Array<object> | null,
    message?: string
  ): ISuccess => {
    return {
      message,
      data,
      status: ResponseMessages.STATUS_SUCCESS,
    };
  };

  /**
   * returns formatted error.
   * @param  {string} message - Error message.
   * @return {object} - The result.
   */
  static error = (message?: string): IError => {
    return {
      message,
      status: ResponseMessages.STATUS_ERROR,
    };
  };

}
