import { StaticImageData } from 'next/image';

import { IDataIcon } from './interfaces';

export type AboutPossibilitie = {
  title: string;
  description: string;
  icon: JSX.Element;
}
export type OurProcess = {
  items:IDataIcon[],
  mockup:string | StaticImageData
}
