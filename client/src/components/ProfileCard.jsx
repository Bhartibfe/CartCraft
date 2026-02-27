import {
  LiaUserEditSolid,
  IoSettingsOutline,
  MdLogout,
} from "../utils/constants";
import avatar from "../assets/avatar.png";
import { useAuth } from "../context/Auth";

const ProfileCard = () => {
  const { signOut, user } = useAuth();

  return (
    <div className="md:absolute md:right-0 md:top-[72px] w-full md:w-[20vw] p-4 atmo-glass atmo-profile-card z-20">
      <div className="flex flex-col items-center justify-center">
        <img
          src={avatar}
          alt=""
          className="w-[75px] mt-1 rounded-full shadow-[2px_2px_22px_1px_#000] hover:shadow-zinc-700"
        />
        <p className="font-semibold text-lg mt-4 atmo-profile-muted">
          {user?.displayName || "User"}
        </p>
        <p className="font-medium text-xs mb-4 atmo-profile-subtle">
          {user?.email || ""}
        </p>
      </div>
      <div>
        <button className="w-full h-10 font-medium flex items-center gap-3 px-2 text-sm rounded-lg atmo-profile-muted hover:atmo-profile-card outline-none hover:bg-[rgba(15,23,42,0.08)] hover:border border-[color:var(--atmo-border-subtle)] ">
          <LiaUserEditSolid className="text-lg " />
          <p className="">Edit Profile</p>
        </button>
        <button className="w-full h-10 font-medium flex items-center gap-3 px-2 text-sm rounded-lg atmo-profile-muted hover:atmo-profile-card outline-none hover:bg-[rgba(15,23,42,0.08)] hover:border border-[color:var(--atmo-border-subtle)] ">
          <IoSettingsOutline className="text-lg" />
          <p>Settings</p>
        </button>
        <button
          className="w-full h-10 font-medium flex items-center gap-3 px-2 text-sm rounded-lg atmo-profile-muted hover:atmo-profile-card outline-none hover:bg-[rgba(15,23,42,0.08)] hover:border border-[color:var(--atmo-border-subtle)] "
          onClick={signOut}
        >
          <MdLogout className="text-lg" />
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
