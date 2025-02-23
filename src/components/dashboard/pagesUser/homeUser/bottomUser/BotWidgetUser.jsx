import React from 'react';
import ApprovalWidgetUser from './ApprovalWidgetUser';
import DatesWidgetUser from './DatesWidgetUser';

export default function BotWidget() {
  return (
    <div className='flex justify-between w-full p-5 gap-10'>
      <DatesWidgetUser />
      <ApprovalWidgetUser />
    </div>
  );
}
