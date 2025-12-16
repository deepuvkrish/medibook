import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";

const Land1 = () => {
  return (
    <div>
      <div className="LandingCard relative flex flex-col gap-4 p-4 w-76 h-[400px] bg-[#14141a] rounded-2xl">
        <div className="LandingCard__border overflow-hidden pointer-events-none absolute -z-10 top-1/2 left-1/2 -translate-1/2 rounded-2xl" />
        <div className="LandingCard_title__container">
          <span className="LandingCard_title text-2xl">Explosive Growth</span>
          <p className="LandingCard_paragraph mt-1 w-2/3 text-sm">
            Perfect for your next content, leave to us and enjoy the result!
          </p>
        </div>
        <hr className="line w-full h-[0.1rem] bg-[#27272f] border-none" />
        <ul className="LandingCard__list">
          <li className="LandingCard__list_item">
            <FaCircleCheck className="text-[#8731f6]" />
            <span className="list_text">10 Launch Weeks</span>
          </li>
          <li className="LandingCard__list_item">
            <FaCircleCheck className="text-[#8731f6]" />
            <span className="list_text">10 Influencers Post</span>
          </li>
          <li className="LandingCard__list_item">
            <FaCircleCheck className="text-[#8731f6]" />
            <span className="list_text">100.000 Views</span>
          </li>
          <li className="LandingCard__list_item">
            <FaCircleCheck className="text-[#8731f6]" />
            <span className="list_text">10 Reddit Posts</span>
          </li>
          <li className="LandingCard__list_item">
            <FaCircleCheck className="text-[#8731f6]" />
            <span className="list_text">2 Hours Marketing Consultation</span>
          </li>
        </ul>
        <Link className="button flex justify-center" href="/login">
          Login Here
        </Link>
      </div>
    </div>
  );
};

export default Land1;
