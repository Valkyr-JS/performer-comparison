import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Glicko from "@/layouts/Glicko/Glicko";
import { Script } from "gatsby";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Script src="http://192.168.0.20:7999/assets/index-84976af5.css" />
      <main>
        <Glicko
          abandonTournamentHandler={() => console.log("abandon")}
          endTournamentHandler={() => console.log("end")}
          filter={{
            genders: ["FEMALE" as GenderEnum],
            limit: 5,
          }}
          pauseTournamentHandler={() => console.log("pause")}
        />
      </main>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
