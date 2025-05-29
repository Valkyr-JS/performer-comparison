import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Glicko from "@/layouts/Glicko/Glicko";

const IndexPage: React.FC<PageProps> = () => {
  return (
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
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
