"use client";
import { FC, PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";

type BaseLayoutProps = PropsWithChildren<{}>;
export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <RecoilRoot>
      <>{children}</>
    </RecoilRoot>
  );
};
