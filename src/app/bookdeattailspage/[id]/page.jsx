import React from 'react';
import BookDetailsPage from './Alldestails';
import { bookdettails } from "@/app/Action/Bookdettaislpage";
import { Historybook } from "@/app/Action/Historydata";
import { userdata } from '@/app/Action/Userinfo';

const Dettaislpage = async({params}) => {
     const {id} = await params
    const book = await bookdettails(id)
    const userId = await userdata()
    const paymentedbook = await Historybook(id)
    const paymented = paymentedbook[0]?.productId
    return (
        <div>
            <BookDetailsPage paymented={paymentedbook} book={book} userId ={userId} userRole={userId.role}></BookDetailsPage>
        </div>
    );
};

export default Dettaislpage;