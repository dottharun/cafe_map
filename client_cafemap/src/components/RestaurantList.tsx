const RestaurantList = () => {
  return (
    <div className="flex justify-center">
      <table>
        {/* head of the table */}
        <thead>
          <tr className="bg-red-700">
            <th>Restaurant</th>
            <th>Location</th>
            <th>Price Range</th>
            <th>Ratings</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        {/* body of the table */}
        <tbody className="bg-slate-500">
          <tr>
            <td>mcdonalds</td>
            <td>new york</td>
            <td>$</td>
            <td>Rating Element</td>
            <td>
              <button>Update</button>
            </td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
