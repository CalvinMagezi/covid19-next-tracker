import { Flex } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "../utils/ColorModeSwitcher";

function Header() {
  return (
    <Flex className="items-center justify-between w-full p-3 border-b border-[whitesmoke] border-opacity-40">
      <ColorModeSwitcher />
    </Flex>
  );
}

export default Header;
