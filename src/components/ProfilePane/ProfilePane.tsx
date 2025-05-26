import React from "react";
import styles from "./ProfilePane.module.scss";

interface ProfilePaneProps {
  /** The performer's profile cover image. */
  profileImage: string;
  /** Up to three random images the performer is tagged in. */
  images: string[];
}

const ProfilePane: React.FC<ProfilePaneProps> = (props) => {
  return (
    <div className={styles["profile-pane"]}>
      <div className={styles["active-image"]}>
        <img src={props.profileImage} />
      </div>
      <div>Image selector</div>
    </div>
  );
};

export default ProfilePane;
