import { gql } from "@apollo/client";

export const GET_PERFORMERS = gql`
  query GetPerformers($genders: [GenderEnum!], $limit: Int) {
    findPerformers(
      filter: { page: 1, per_page: $limit, sort: "random" }
      performer_filter: { gender: { value_list: $genders, modifier: INCLUDES } }
    ) {
      count
      performers {
        custom_fields
        id
        image_path
        name
      }
    }
  }
`;
