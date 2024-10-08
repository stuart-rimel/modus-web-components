// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from '../ModusIconMap';

export const IconHorizontalEllipsis: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-horizontal-ellipsis ${props.pressed ? 'pressed' : ''}`}
    fill={props.color ?? 'currentColor'}
    height={props.size ?? 16}
    onClick={props.onClick ? () => props.onClick() : null}
    viewBox="0 0 24 24"
    width={props.size ?? 16}>
    <path d="M10.59 10.59c-.78.78-.78 2.05 0 2.83s2.05.78 2.83 0 .78-2.05 0-2.83-2.05-.78-2.83 0Zm7 0c-.78.78-.78 2.05 0 2.83s2.05.78 2.83 0 .78-2.05 0-2.83-2.05-.78-2.83 0Zm-14 0c-.78.78-.78 2.05 0 2.83s2.05.78 2.83 0 .78-2.05 0-2.83-2.05-.78-2.83 0Z" />
  </svg>
);
