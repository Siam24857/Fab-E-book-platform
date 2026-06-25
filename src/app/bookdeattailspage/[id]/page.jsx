import { redirect } from "next/navigation";
import BookDetailsPage from "./Alldestails";
import { userdata, userseissondata } from "@/app/Action/Userinfo";
import { Historybook } from "@/app/Action/Historydata";
import { bookdettails } from "@/app/Action/Bookdettaislpage";

const Dettaislpage = async ({ params }) => {
  const { id } = await params;

  const book = await bookdettails(id);
  const userId = await userdata();

  if (!userId) {
    redirect("/Login");
  }

  const token = await userseissondata();
  const paymentedbook = await Historybook(token, id);

  return (
    <div>
      <BookDetailsPage
        paymented={paymentedbook}
        book={book}
        userId={userId}
        userRole={userId.role}
      />
    </div>
  );
};

export default Dettaislpage;