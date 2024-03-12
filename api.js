import sanityClient from "./sanity";

let sanityQuery = (query, params) => sanityClient.fetch(query, params);

export const getFeaturedRestaurants = () => {
  return sanityQuery(
    `*[_type=="featured"]{
      ...,
        restaurant[]->{
          ...,
              dishes[]->{
                name
              }
        }
    }
`
  );
};

export const getCategories = () => {
  return sanityQuery(`
  *[_type=='category']
  `);
};

export const getFeaturedRestaurantById = (id) => {
  return sanityQuery(
    `
    *[_type=="featured" && _id == $id]{
      ...,
        restaurant[]->{
          ...,
              dishes[]->{
                name
              }
        }
    }[0]
  `,
    { id }
  );
};
