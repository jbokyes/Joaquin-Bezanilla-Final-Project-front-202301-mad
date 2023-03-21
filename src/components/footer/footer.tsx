import styles from "./footer.module.scss";

export function Footer() {
  return (
    <div className={styles.footer}>
      <div className="blank">
        <img
          className={styles.palta}
          src="./images/typical-latino.jpg"
          alt="mexican-avocado"
        />
      </div>
      <div className={styles.footer__actual}>
        <p className={styles.foods}>Actual latino foods</p>
        <p className="footer__by">By: Joaquín Bezanilla</p>
      </div>
      <div className={styles.footer__socials}>
        <img
          className={styles.icon}
          src="./images/ig-icon.png"
          alt="instagram-icon"
        />
        <img
          className={styles.icon}
          src="./images/twitter-icon.png"
          alt="twitter-icon"
        />
        <img
          className={styles.icon}
          src="./images/fb-icon.png"
          alt="facebook-icon"
        />
      </div>
    </div>
  );
}
