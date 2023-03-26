import { Form } from "./form";
import styles from "./add.module.scss";
export default function Add() {
  return (
    <div className={styles.add}>
      <h2>Add new food</h2>
      <Form></Form>
    </div>
  );
}
