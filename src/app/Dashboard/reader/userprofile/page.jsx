import { userdata } from "@/app/Action/Userinfo";
import ProfilePageClient from "@/app/components/ProfilePageClient";

const ProfilePage = async () => {
  const user = await userdata();

  return <ProfilePageClient user={user} roleLabel="Reader" />;
};

export default ProfilePage;