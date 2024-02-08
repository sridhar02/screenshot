import React, { useState } from "react";
import { MoveDown, MoveUp } from "lucide-react";

type HeadingProps = {
  title: string;
};

const Heading = ({ title }: HeadingProps) => {
  const [select, setSelect] = useState(false);

  return (
    <h2 className="inline-flex text-lg font-medium text-blue-800">
      Wait and delay options{" "}
      {select ? <MoveUp size={20} /> : <MoveDown size={20} />}
    </h2>
  );
};

export default Heading;
