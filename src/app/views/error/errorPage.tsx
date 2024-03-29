/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-28 13:13:23
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-03-28 13:31:14
 * @Description:
 */
import { useRouteError } from 'react-router-dom';
import styles from './errorPage.module.scss';

/* eslint-disable-next-line */
export interface ErrorPageProps {}

export function ErrorPage(props: ErrorPageProps) {
  const error: any = useRouteError();
  return (
    <div className={styles['container']}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <h2 className="text-red-500">{error.statusText || error?.message}</h2>
      </p>
    </div>
  );
}

export default ErrorPage;
