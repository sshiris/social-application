import Image from "next/image";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-sm">
      {/* Top */}
      <div className="flex items-center  justify-between text-gray-500 font-medium">
        <span>Sponsored ads</span>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>
      {/* Bottom */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src="https://images.pexels.com/photos/7016662/pexels-photo-7016662.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/7016662/pexels-photo-7016662.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={24}
            height={24}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-blue-500 font-medium">Eunice Larson</span>
        </div>
        <p className={`${size === "sm" ? "text-xs" : "text-sm"}`}>
          {size === "sm"
            ? "religious recently goes fox opposite spoken warm total four paid cave making include lonely pass describe swung recall choice shadow silent unknown liquid combine"
            : size === "md"
            ? "religious recently goes fox opposite spoken warm total four paid cave making include lonely pass describe swung recall choice shadow silent unknown liquid combinereligious recently goes fox opposite spoken warm total four paid cave making include lonely pass describe swung recall choice shadow silent unknown liquid combine"
            : "religious recently goes fox opposite spoken warm total four paid cave making include lonely pass describe swung recall choice shadow silent unknown liquid combinereligious recently goes fox opposite spoken warm total four paid cave making include lonely pass describe swung recall choice shadow silent unknown liquid combine"}
        </p>
        <button className="bg-gray-200 rounded-lg text-gray-500 text-xs p-2">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Ad;
