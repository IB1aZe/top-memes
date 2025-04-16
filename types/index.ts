import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type User = {
  id: number;
  title: string;
  url: string;
  likes: number;
};
