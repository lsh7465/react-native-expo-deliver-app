import sanityClient from "./sanity";

let sanityQuery = (query, params) => sanityClient.fetch(query, params);

export const getFeaturedRestaurants = () => {
  return sanityQuery(`*[_type=="featured"]{
    ...,
      restaurant[]->{
        ...,
            dishes[]->{
              name
            }
      }
  }`)
};

export const getCategories = () => {return sanityQuery(`*[_type=="category"]`)};

export const getFeaturedRestaurantsById = (id) => {
  return sanityQuery(
    `*[_type=='featured' && _id == $id]
      ...,
        restaurant[]->{
          ...,
          dishes[]->{
            ...
          },
          type->{
              name
          } 
        }
    }[0]
    `,
    {id}
  )
};
