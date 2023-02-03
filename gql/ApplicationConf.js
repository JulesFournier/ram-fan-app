import { gql } from "@apollo/client";


const ApplicationConf = {
  characters: {
    getByPage(pageNb) {
      return gql`
        query {
          characters(page: ${pageNb}) {
            info {
              count
              pages
              next
              prev
            }
            results {
              name
              status
              species
              type
              gender
              image
            }
          }
        }
      `
    }
  }
}
export default ApplicationConf;
