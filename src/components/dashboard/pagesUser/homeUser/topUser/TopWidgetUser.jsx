import React from 'react';
import ClientsWidgetUser from './ClientsWidgetUser';
import LoansWidgetUser from './LoansWidgetUser';
import PaymentsWidgetUser from './PaymentsWidgetUser';

export default function TopWidgetUser() {
  return (
    <div className='flex justify-between w-full p-5 gap-10'>
      <ClientsWidgetUser />
      <LoansWidgetUser />
      <PaymentsWidgetUser />
    </div>
  );
}
