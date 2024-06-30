import { gql } from 'graphql-request';
import { Graphqlclient } from './graphqlClient';

//remember we can opt for codegen if we want but just for simpliciy we will use graphql-request and custom query shcemas

export const getAllListingsSchema = gql`
query GetListingById {
  getAllListings {
    id
    Userid
    title
    description
    imageSrc
    category
    roomCount
    bathroomCount
    guestCount
    locationValue
    price
    reservations
    heartlist
  }
}
`
//skipping the typeDefination

export const getAllListings = async () => {
    try {
        const data = await Graphqlclient.request(getAllListingsSchema);
        console.info(JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.error('Error fetching listings:', error);
        return null;
    }
};

export const getListingByIdSchema = gql`query GetAllListings($getListingByIdId: ID!) {
  getListingById(id: $getListingByIdId) {
    id
    Userid
    title
    description
    imageSrc
    category
    roomCount
    bathroomCount
    guestCount
    locationValue {
      flag
      latlong {
        lat
        long
      }
      name
      region
    }
    price
    reservations
    heartlist
  }
}
`

//skipping the typeDefination
export const getListingById = async (listingsId: string) => {
    console.log(listingsId)
    try {
        const document = {
            "getListingByIdId": listingsId
        }
        const data = await Graphqlclient.request(getListingByIdSchema, document);
        //skipping the typeDefination
        return data.getListingById
    } catch (error) {
        console.error('Error fetching listings:', error);
        return null;
    }
};