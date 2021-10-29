import React, { useState } from "react";

export default function NavBar({ color }) {
  const [num, setnum] = useState(0);

  const onIncrease = () => {
    setnum(num + 1);
  };
  const onDecrease = () => {
    setnum(num - 1);
  };

  return (
    <div
      style={{
        color,
      }}
    >
      NavBar
    </div>
  );
}
