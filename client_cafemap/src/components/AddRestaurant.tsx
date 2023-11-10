const AddRestaurant = () => {
  return (
    <form className="mb-5 flex justify-center flex-row">
      <input className="m-1 p-1" type="text" placeholder="name" />
      <input className="m-1 p-1" type="text" placeholder="location" />
      <select className="m-1 p-1">
        <option disabled>price range</option>
        <option value="1">$</option>
        <option value="2">$$</option>
        <option value="3">$$$</option>
        <option value="4">$$$$</option>
        <option value="5">$$$$$</option>
      </select>
      <button className="m-1 p-1">Add</button>
    </form>
  );
};

export default AddRestaurant;
