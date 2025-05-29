import React from "react";
import styles from "./Modal.module.scss";

interface ModalProps {}

const Modal: React.FC<ModalProps> = (props) => {
  return <section className={styles.modal}>Modal</section>;
};

export default Modal;
