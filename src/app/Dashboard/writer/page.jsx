// ./src/app/Dashboard/writer/page.jsx (বা Allwrites/page.jsx)
import { userdata } from '@/app/lib/Action/Userinfo';
import { Writerbooks } from '@/app/lib/Action/Writerebook';
import { WriterHistorybook } from '@/app/lib/Action/Writerhistorysales';
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