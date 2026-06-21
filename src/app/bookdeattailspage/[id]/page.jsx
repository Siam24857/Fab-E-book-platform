import React from 'react';
import BookDetailsPage from './Alldestails';
import { bookdettails } from "@/app/lib/Action/Bookdettaislpage";
import { Historybook } from "@/app/lib/Action/Historydata";
import { userdata } from '@/app/lib/Action/Userinfo';

const Dettaislpage = async({params}) => {
     const {id} = await params
    const book = await bookdettails(id)
    const userId = await userdata()
    const paymentedbook = await Historybook(id)
    const paymented = paymentedbook[0]?.productId
    return (
        <div>
            <BookDetailsPage paymented={paymented} book={book} userId ={userId}></BookDetailsPage>
        </div>
    );
};

export default Dettaislpage;