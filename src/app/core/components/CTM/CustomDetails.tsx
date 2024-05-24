/*
 * @Author: W·S
 * @Date: 2023-11-14 17:52:29
 * @LastEditors: chenyuting
 * @LastEditTime: 2024-05-24 14:46:14
 * @Description: Description
 */

import useHook from '@/app/hooks/useHook';
import {
  CustomDescription,
  CustomDescriptionProps
} from '@bsnbase/components-react';
import { Button } from 'antd';
import { PropsWithChildren } from 'react';

const CustomDetails = (
  props: PropsWithChildren<{ span?: number; hiddenButton?: boolean }>
) => {
  const { t, routerPush } = useHook();
  return (
    <>
      <div
        className={`grid ${
          props?.span === 4
            ? '2xl:grid-cols-4'
            : props?.span === 3
              ? '2xl:grid-cols-3'
              : '2xl:grid-cols-2'
        } gap-[1.875rem] xl:grid-cols-2`}
      >
        {props.children}
      </div>
      {props.hiddenButton ?? (
        <div className="flex justify-end mt-13">
          <Button
            type="primary"
            className="px-8 py-2 h-auto"
            onClick={() => {
              routerPush(-1);
            }}
          >
            {t('ACT_Back')}
          </Button>
        </div>
      )}
    </>
  );
};

CustomDetails.Card = (props: CustomDescriptionProps & { full?: boolean }) => {
  return (
    <CustomDescription
      className={props.full ? 'col-span-full' : ''}
      column={3}
      {...props}
      header={props?.header}
      items={props.items?.map((item) => {
        return {
          key: String(item.label),
          ...item
        };
      })}
    />
  );
};

export default CustomDetails;
