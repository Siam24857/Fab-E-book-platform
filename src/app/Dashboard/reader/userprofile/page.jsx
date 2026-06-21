import { userdata } from "@/app/lib/Action/Userinfo";

const ProfilePage = async () => {
  const user = await userdata();

  const firstLetter =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  const memberSince = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="px-10 py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[4px] text-[#8a6e5c]">
          Account
        </p>

        <h1 className="mt-2 text-5xl font-serif font-bold text-[#1d2230]">
          Profile
        </h1>
      </div>

      {/* Card */}
      <div className="max-w-3xl rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
        {/* User Info */}
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center bg-[#171313] text-5xl font-serif font-bold text-white">
            {firstLetter}
          </div>

          <div>
            <h2 className="text-4xl font-serif font-bold text-[#1d2230]">
              {user?.name}
            </h2>

            <p className="mt-1 text-2xl text-[#8a6e5c]">
              User
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-10 space-y-6">
          <div>
            <p className="uppercase tracking-[2px] text-[#8a6e5c]">
              Full Name
            </p>

            <p className="mt-2 text-2xl font-medium">
              {user?.name}
            </p>
          </div>

          <hr />

          <div>
            <p className="uppercase tracking-[2px] text-[#8a6e5c]">
              Email
            </p>

            <p className="mt-2 text-2xl font-medium">
              {user?.email}
            </p>
          </div>

          <hr />

          <div>
            <p className="uppercase tracking-[2px] text-[#8a6e5c]">
              Role
            </p>

            <p className="mt-2 text-2xl font-medium">
              User
            </p>
          </div>

          <hr />

          <div>
            <p className="uppercase tracking-[2px] text-[#8a6e5c]">
              Member Since
            </p>

            <p className="mt-2 text-2xl font-medium">
              {memberSince}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;