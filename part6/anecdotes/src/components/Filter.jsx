import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

export const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };
  return (
    <div>
      filter <input onChange={handleChange} value={filter} />
    </div>
  );
};
