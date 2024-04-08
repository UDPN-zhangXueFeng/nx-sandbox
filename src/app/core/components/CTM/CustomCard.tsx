/*
 * @Author: W·S
 * @Date: 2023-11-14 11:28:47
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-08 15:58:59
 * @Description: Description
 */

import { PropsWithChildren, ReactNode } from 'react';
export interface CustomCardProps {
  title?: string | ReactNode;
  grid?: boolean;
  full?: boolean;
  extra?: ReactNode;
  className?: string;
}

const CustomCard = (props: PropsWithChildren<CustomCardProps>) => {
  const { full, grid, title, extra, children, className } = props;
  return (
    <section
      className={
        `${className} bg-[#FFF] px-6 py-2 rounded-xl border-solid border-[#E2E8F0] text-lg text-[#14171D] ` +
        (full ? 'col-span-full' : '')
      }
    >
      {title || extra ? (
        <div className="flex justify-between items-center py-3 px-6 text-theme border-b-[#D9D9D9] border-solid border-0 border-b-[1px]">
          <span className="font-bold">{title}</span>
          <span className="text-sm cursor-pointer">{extra}</span>
        </div>
      ) : null}

      <div
        className={
          'my-6 px-6 break-all ' + (grid ? 'grid grid-cols-2 gap-4' : '')
        }
      >
        {children}
      </div>
    </section>
  );
};

export default CustomCard;
