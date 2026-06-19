import React from 'react';
import BookStore from './Allbrosewbooks';
import { allbookdata } from '../lib/Action/ALlbooks';

const Brosersbooks = async ({ searchParams }) => {
  const allbook = await allbookdata();

  const params = await searchParams;  

  return (
    <div>
      <BookStore BOOKS={allbook} serchparams={params} />
    </div>
  );
};

export default Brosersbooks;