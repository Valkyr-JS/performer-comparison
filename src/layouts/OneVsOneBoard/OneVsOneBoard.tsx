import React, { useState } from "react";
import styles from "./OneVsOneBoard.module.scss";
import { useQuery, gql } from "@apollo/client";

interface OneVsOneBoardProps {
  profiles: [PerformerData, PerformerData];
  /** Executes when the user selects the winning performer. */
  clickSelectHandler: React.MouseEventHandler<HTMLElement>;
}

interface PerformerData {
  cover: string;
  id: Performer["id"];
  name: Performer["name"];
}

const OneVsOneBoard: React.FC<OneVsOneBoardProps> = (props) => {
  return (
    <section className={styles["one-vs-one-board"]}>
      <header>
        <h1>One-on-One</h1>
      </header>
      <div className={styles["filters"]}>
        <button style={{ width: "100%" }}>Update filters</button>
      </div>
      <div className={styles["profiles"]}>
        <Profile
          {...props.profiles[0]}
          clickSelectHandler={props.clickSelectHandler}
        />
        <Profile
          {...props.profiles[1]}
          clickSelectHandler={props.clickSelectHandler}
        />
      </div>
      <div className={styles["tools"]}>
        <div style={{ marginBottom: "10px" }}>
          <button style={{ marginRight: "10px" }}>Undo</button>
          <button>Skip</button>
        </div>
        <button>Leaderboard</button>
      </div>
    </section>
  );
};

export default OneVsOneBoard;

/* ---------------------------------------------------------------------------------------------- */
/*                                        Profile component                                       */
/* ---------------------------------------------------------------------------------------------- */

interface ProfileProps extends PerformerData {
  /** Executes when the user selects the winning performer. */
  clickSelectHandler: React.MouseEventHandler<HTMLElement>;
}

const Profile = (props: ProfileProps) => {
  const [src, setSrc] = useState(props.cover);
  const [imgID, setImgID] = useState(0);

  /* ---------------------------------------- Change image ---------------------------------------- */

  const handleChangeImage: React.MouseEventHandler<HTMLButtonElement> = (_e) =>
    refetch().then(() => {
      if (!loading && !error) {
        if (data.findImages.count) {
          setSrc(data.findImages.images[0].paths.thumbnail);
          setImgID(data.findImages.images[0].id);
        }
      }
    });

  const { loading, error, data, refetch } = useQuery(
    gql`
      query ChangeProfileImage($id: ID!, $imgID: Int!) {
        findImages(
          filter: { per_page: 1, sort: "random" }
          image_filter: {
            performers: { value: [$id], modifier: INCLUDES }
            orientation: { value: PORTRAIT }
            id: { value: $imgID, modifier: NOT_EQUALS }
          }
        ) {
          count
          images {
            id
            paths {
              thumbnail
            }
          }
        }
      }
    `,
    {
      variables: {
        id: props.id,
        imgID,
      },
    }
  );

  // Disable the change image button while a new image is loading, and if there
  // are no images avaible.
  const changeImageDisabled = loading || data.findImages.count === 0;

  /* ------------------------------------------ Component ----------------------------------------- */

  return (
    <div className={styles["profile"]}>
      <h2>{props.name}</h2>
      <div className={styles["profile-image"]}>
        <img src={src} alt={props.name} />
      </div>
      <div className={styles["button-list"]}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={props.clickSelectHandler}
        >
          Select
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          disabled={changeImageDisabled}
          onClick={handleChangeImage}
        >
          <span className="sr-only">Change image for {props.name}</span>
          New image
        </button>
      </div>
    </div>
  );
};
