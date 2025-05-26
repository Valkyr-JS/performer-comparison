import React, { useState } from "react";
import styles from "./ProfilePane.module.scss";

interface ProfilePaneProps {
  /** Up to three random images the performer is tagged in. */
  images: string[];
  name: string;
}

const ProfilePane: React.FC<ProfilePaneProps> = (props) => {
  const [currentIndex, setIndex] = useState(0);

  return (
    <div className={styles["profile-pane"]}>
      <div className={styles["active-image"]}>
        <img
          src={props.images[currentIndex]}
          alt={`${props.name} image ${currentIndex + 1}`}
        />
      </div>
      <ul>
        {props.images.map((src, i) => (
          <ImageOption
            name={props.name}
            index={i}
            onClick={() => setIndex(i)}
            src={src}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProfilePane;

/* ----------------------------------- Image option component ----------------------------------- */

interface ImageOptionProps {
  index: number;
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  src: string;
}

const ImageOption: React.FC<ImageOptionProps> = (props) => {
  return (
    <li>
      <button type="button" onClick={props.onClick}>
        <img src={props.src} alt={`${props.name} image ${props.index + 1}`} />
      </button>
    </li>
  );
};
