// ./src/app/Dashboard/writer/page.jsx (বা Allwrites/page.jsx)
import { userdata } from '@/app/Action/Userinfo';
import { Writerbooks } from '@/app/Action/Writerebook';
import { WriterHistorybook } from '@/app/Action/Writerhistorysales';
import WriterClient from './Allwritedettails';

const Allwrites = async () => {
  const userdatas = await userdata();
  const Writerbook = await Writerbooks(userdatas.id);
  const WriterHistorybooks = await WriterHistorybook(userdatas.id);

  return (
    <WriterClient
      user={userdatas} 
      books={Writerbook} 
      salesHistory={WriterHistorybooks} 
    />
  );
};

export default Allwrites;