import { Heading } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { CurrentCard, CurrentCaseType } from "../../atoms/CardsAtom";

export interface Props {
  title: string;
  amount: string;
  total: string;
  caseType: string;
}

function Statistic({ title, amount, total, caseType }: Props) {
  const [current, setCurrent] = useRecoilState(CurrentCard);
  const [currentType, setCurrentType] = useRecoilState(CurrentCaseType);

  return (
    <div
      onClick={() => {
        setCurrent(title);
        setCurrentType(caseType);
      }}
      className={`py-5 px-10 drop-shadow-md rounded bg-[whitesmoke] flex flex-col space-y-4 cursor-pointer hover:scale-105 transition duration-200 ease-in-out ${
        current === title && "border-t-4 "
      } ${title === "Recovered" ? "border-green-600" : "border-red-600"}`}
    >
      <Heading size="sm" letterSpacing={2} className="text-gray-600">
        {title}
      </Heading>
      <Heading
        size="lg"
        letterSpacing={4}
        className={`${
          title === "Recovered" ? "text-green-600" : "text-red-600"
        } font-bold`}
      >
        +{amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </Heading>
      <h3 className="text-gray-600">
        {total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Total
      </h3>
    </div>
  );
}

export default Statistic;
