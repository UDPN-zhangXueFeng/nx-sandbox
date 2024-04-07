/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-28 13:13:23
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-07 10:57:33
 * @Description:
 */
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styles from './errorPage.module.scss';

/* eslint-disable-next-line */
export interface ErrorPageProps {}

export function ErrorPage(props: ErrorPageProps) {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <div className={styles['container']}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <h2 className="text-red-500">{errorMessage}</h2>
      </p>
    </div>
  );
}

export default ErrorPage;
