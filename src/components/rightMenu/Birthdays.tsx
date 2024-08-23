import Image from "next/image";
import Link from "next/link";

const Birthdays = () => {
  return (
    <div className="bg-white shadow-md p-4 text-sm rounded-lg flex flex-col gap-4">
      {/* Top */}
      <div className="">
        <div className="flex items-center justify-between font-medium ">
          <span className="text-grau-500">Birthdays</span>
        </div>
      </div>
      {/* Middle  */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/26976861/pexels-photo-26976861/free-photo-of-rear-view-of-a-woman-wrapped-in-a-white-shawl-standing-on-the-sand-dune.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=" "
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">Violet Long</span>
        </div>
        <div className="flex gap-3 justify-end">
          <button className="bg-blue-500 rounded-md text-xs px-2 py-1 text-white">
            Celebrate
          </button>
        </div>
      </div>
      {/* Upcoming*/}
      <div className="bg-slate-100 rounded-lg flex gap-4 p-4 items-center">
        <Image src="/gift.png" alt="" width={24} height={24} />
        <Link href="/" className="flex flex-col gap-1 text-xs">
          <span className="text-gray-700 font-semibold">
            Upcoming Birthdays
          </span>
          <span className="text-gray-500">
            See other 16 have upcoming birthdays
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Birthdays;
