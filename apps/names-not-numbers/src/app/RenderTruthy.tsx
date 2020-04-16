import React from 'react';
import { isTruthy } from '@parm/util';

export const RenderTruthy = ({
  children, o
}: {
  /** children to render */
  children: JSX.Element,
  /** the if-y object to check */
  o: any,
}) => {
  return o ? children : null;
}

export function RenderConditional<T, K>({
  children, o, test
}: {
  /** children to render */
  children: ((o: T) => any) | JSX.Element
  /** the if-y object to check */
  o?: T,
  /** */
  test: ((o: T) => boolean) | any,
} | {
  /** children to render */
  children: ((o: T) => K)
  /** the if-y object to check */
  o?: T,
  /** renders if test evaluates true */
  test: ((o: T) => boolean)
}) {
  test = typeof test === 'function' ? test(o) : test;
  children = typeof children === 'function' ? children(o) : children;
  return test ? <>{children}</> : null;
}

export function RenderFirst<T>({
  children
}: {
  /** children to render */
  children: any[],
}) {
  return children.find(isTruthy) || null;
}