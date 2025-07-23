import Image from "next/image";
import React from "react";

export default function Roadmap() {
  const quarters = [
    {
      id: "Q1",
      items: [
        "Community hubs activated",
        "Unveiled streamlined litepaper",
        "MVP Building",
      ],
      show: false,
    },
    {
      id: "Q2",
      items: [
        "MVP Launch Party (Phase One)",
        "OG Tester Squad",
        "$BLOCK Token Launch",
        "Character Concept Drop (Block)",
      ],
      show: true,
    },
    {
      id: "Q3",
      items: [
        "Beta Launching (Phase Two)",
        "Triple Boost: Marketing campaigns",
        'Launching Block episodes/First Episodes of "The Block"',
      ],
      show: false,
    },
    {
      id: "Q4",
      items: [
        "Full Platform Launch",
        "Feature Expansion",
        "Monetization & Economy Tuning",
      ],
      show: false,
    },
  ];
  return (
    <div>
      <div className="font-extrabold text-3xl text-center mb-10">ROADMAP</div>
      <div className="overflow-x-auto">
        <div className=" min-w-[768px]">
          <div className="flex items-center justify-center">
            <div className="w-full relative">
              {/* <div className="absolute top-[22%] left-0 right-0 h-[1px] bg-green-400 z-0" /> */}
              <div className="flex justify-around items-end">
                {quarters.map((quarter, index) => (
                  <div
                    key={quarter.id}
                    className="flex flex-col items-center relative"
                  >
                    {quarter.show && (
                      <Image
                        alt=""
                        src={"/blinkLogo.gif"}
                        width={40}
                        height={40}
                        className=""
                      />
                    )}
                    {/* {index < quarters.length - 1 && (
                      <div className="flex-1 h-[1px] bg-green-400"></div>
                    )} */}
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    {/* {index > 0 && (
                      <div className="flex-1 h-[1px] bg-green-400"></div>
                    )} */}
                  </div>
                ))}
              </div>
              <div className="flex justify-around items-center mb-4 mt-4">
                {quarters.map((quarter) => (
                  <div
                    key={quarter.id}
                    className="text-center font-bold text-4xl"
                  >
                    {quarter.id}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs font-medium">
                {quarters.map((quarter) => (
                  <ul
                    key={quarter.id}
                    className="text-left list-disc pl-5 max-w-[250px]"
                  >
                    {quarter.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
