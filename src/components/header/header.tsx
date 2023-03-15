import React from "react";

type HeaderProps = { children: JSX.Element };

export function Header({ children }: HeaderProps) {
  return (
    <header>
      <h1 className="header__title">Actual latino foods</h1>
      <div>{children}</div>
    </header>
  );
}
