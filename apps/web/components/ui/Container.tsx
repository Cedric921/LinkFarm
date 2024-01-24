import { FC, PropsWithChildren } from 'react';

import { clsxm } from '@/utils/lib/helpers';

type ContainerProps = PropsWithChildren<{
  className?: string
  tag?:keyof JSX.IntrinsicElements
  [key:string]:string|undefined|unknown

}>
export const Container:FC<ContainerProps> = ({className ,children,tag: Container='div',...props}) => {
  return (
    <Container className={clsxm('container mx-auto px-4',className)} {...props}>{children}</Container>
  )
}
