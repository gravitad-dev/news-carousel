import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(import.meta.env.VITE_GRAPHQL_API_URL);

const QUERY_CNN = gql`
  {
    cnns(where: { active: true }) {
      active
      createdAt
      id
      name
      order
      image {
        url
      }
      publishedAt
      updatedAt
    }
  }
`;

const QUERY_REUTERS = gql`
  {
    reuters(where: { active: true }) {
      active
      createdAt
      id
      name
      order
      image {
        url
      }
      publishedAt
      updatedAt
    }
  }
`;

const QUERY_PAIS = gql`
  {
    diarioElPais(where: { active: true }) {
      active
      createdAt
      id
      name
      order
      image {
        url
      }
      publishedAt
      updatedAt
    }
  }
`;

export const getCnnData = async () => {
  try {
    console.log("Realizando solicitud GraphQL...");
    const { cnns } = await graphcms.request(QUERY_CNN);
    //console.log("Datos recibidos:", cnns);
    return cnns;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getReutersData = async () => {
  try {
    console.log("Realizando solicitud GraphQL...");
    const { reuters } = await graphcms.request(QUERY_REUTERS);
    //console.log("Datos recibidos:", reuters);
    return reuters;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getPaisData = async () => {
  try {
    console.log("Realizando solicitud GraphQL...");
    const { diarioElPais } = await graphcms.request(QUERY_PAIS);
    //console.log("Datos recibidos:", diarioElPais);
    return diarioElPais;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
