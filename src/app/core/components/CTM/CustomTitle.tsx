/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-06 13:53:00
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-04-08 10:38:05
 * @Description:
 */
import React, { PropsWithChildren, ReactNode } from 'react';
export interface ComPageTitleProps {
  title: string;
  subTitle: string;
  rsubTitle?: ReactNode;
}
export const ComTitle = (props: ComPageTitleProps) => {
  const { title, subTitle, rsubTitle = <div></div> } = props;
  return (
    <div>
      <div className="text-[1rem] font-[600] text-[#60A3CE] py-[0.625rem]">
        {title}
      </div>
      <div className="flex justify-between items-center">
        <div className="font-[700] text-[1.75rem] pb-[1.15rem]">{subTitle}</div>
        <div>{rsubTitle}</div>
      </div>
    </div>
  );
};
export const ComCard = (props: PropsWithChildren<{ title: string }>) => {
  const { title } = props;
  return (
    <div className="bg-white p-10 rounded-2xl  min-w-[1000px] overflow-x-scroll">
      <div className="flex justify-between items-center mb-6">
        <div className="text-[1.75rem] font-[700] text-[#183673]">{title}</div>
        <div></div>
      </div>
      {props.children}
    </div>
  );
};
export const ComLineCard = (
  props: PropsWithChildren<{ a: ReactNode; b?: ReactNode }>
) => {
  const { a, b } = props;
  return (
    <div className="border m-auto border-solid border-[#cbcbcb] rounded-2xl pb-[3.125rem] pt-6 px-6 bg-[#f4f9fe] mb-10">
      <div className="flex justify-between pb-6">
        <div className="text-[1.375rem] font-[700]">{a}</div>
        <div>{b}</div>
      </div>
      {props.children}
    </div>
  );
};
