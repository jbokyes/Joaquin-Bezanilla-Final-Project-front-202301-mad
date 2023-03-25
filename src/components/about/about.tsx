import React from "react";
import styles from "./about.module.scss";
export function About() {
  return (
    <div className={styles.about}>
      <div className={styles.about__div}>
        <h2 className={styles.about__title}>About this Page</h2>
        <p className={styles.about__subtitle}>What is this site?</p>
        <p className={styles.about__paragraph}>
          This site’s main intention is to show information of the most common
          latin american food. All the information in this web is the result of
          the collaboration of both users and us the administrators.
        </p>
      </div>
      <div className={styles.about__div}>
        <p className={styles.about__subtitle}>How does it work?</p>
        <p className={styles.about__paragraph}>
          You can check out every food plate in our database in the Home page.
          After accessing to your user, you can create new plates that aren’t
          yet in our database. At the same time, you can also update food plates
          we currently store.
        </p>
      </div>
      <div className={styles.about__div}>
        <p className={styles.about__subtitle}>Who made this website?</p>
        <p className={styles.about__paragraph}>
          I am Joaquín Bezanila, current student at the ISDI Bootcamp in Madrid.
          I also do love food, specially from latin america.
        </p>
      </div>
    </div>
  );
}

export default About;
