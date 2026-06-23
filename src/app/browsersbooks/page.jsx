import React from 'react';
import BookStore from './Allbrosewbooks';
import { allbookdata } from '../Action/ALlbooks';

const Brosersbooks = async ({ searchParams }) => {
  // Fix 1: No need to await searchParams in Next.js 15+ as it's already resolved
  const params = searchParams;
  
  // Fix 2: Await the data fetching
  const allbook = await allbookdata();

  // Fix 3: Pass params correctly to BookStore
  return (
    <div className="flex-1">
      <BookStore BOOKS={allbook} searchparams={params} />
    </div>
  );
};

export default Brosersbooks;