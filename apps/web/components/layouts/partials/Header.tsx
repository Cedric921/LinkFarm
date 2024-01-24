"use client";

import { FC, PropsWithChildren } from "react";

type HeaderProps = PropsWithChildren<{}>;

export const Header: FC<HeaderProps> = ({ children }) => {
  return <header className="relative">{children}</header>;
};
