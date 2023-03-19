import React from "react";
import styles from "./header.module.scss";
type HeaderProps = { children: JSX.Element };

export function Header({ children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <img
        className={styles.header__image}
        src="./images/sopaipilla-kawaii.jpg"
        alt="sopaipilla-kawaii"
      />
      <h1 className={styles.header__title}>Actual latino foods</h1>
      <div>{children}</div>
    </header>
  );
}
