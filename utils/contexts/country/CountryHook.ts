import { CountryContext } from "./CountryContext";
import { useContext } from "react";
import _ from "lodash";

export const useCountryContext = () => {
  const { state, action } = useContext(CountryContext);
  const sortedList = _.orderBy(
    state.list,
    // sort by property :
    [(item) => item.name.common],
    // order
    ["asc"],
  );
  return {
    state,
    action,
    getters: {
      sortedList: sortedList,
    },
  };
};
