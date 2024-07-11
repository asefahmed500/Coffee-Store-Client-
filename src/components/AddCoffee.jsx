import Swal from "sweetalert2";

const AddCoffee = () => {
    const handleAddCoffee = event => {
      event.preventDefault();
  
      const form = event.currentTarget;
  
      const name = form.name.value;
      const quantity = form.quantity.value;
      const supplier = form.supplier.value;
      const taste = form.taste.value;
      const category = form.category.value;
      const details = form.details.value;
      const photo = form.photo.value;
  
      const newcoffee = { name, quantity, supplier, taste, category, details, photo };
      console.log(newcoffee);
  
      // Send coffee to server
      fetch('http://localhost:5000/coffee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newcoffee)
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        if(data.insertedId){
            // alert("coffee added successfully ")
            Swal.fire({
              icon: "success",
              title: "Confrim  Message ",
              text: "Coffee Added Successfully ",
              
            });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };
  
    return (
      <div className="bg-[#F4F3F0] p-24">
        <h2>Add coffee</h2>
        <form onSubmit={handleAddCoffee}>
          {/* form row name and quantity */}
          <div className="md:flex mb-8">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Coffee Name</span>
              </label>
              <label className="input-group">
                <input type="text" placeholder="Coffee Name" name="name" className="input input-bordered w-full" />
              </label>
            </div>
            <div className="form-control md:w-1/2 ml-4">
              <label className="label">
                <span className="label-text">Available Quantity</span>
              </label>
              <label className="input-group">
                <input type="text" placeholder="Available Quantity" name="quantity" className="input input-bordered w-full" />
              </label>
            </div>
          </div>
          {/* form row supplier and taste */}
          <div className="md:flex mb-8">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Supplier</span>
              </label>
              <label className="input-group">
                <input type="text" placeholder="Supplier" name="supplier" className="input input-bordered w-full" />
              </label>
            </div>
            <div className="form-control md:w-1/2 ml-4">
              <label className="label">
                <span className="label-text">Taste</span>
              </label>
              <label className="input-group">
                <input type="text" placeholder="Taste" name="taste" className="input input-bordered w-full" />
              </label>
            </div>
          </div>
          {/* form row category and details */}
          <div className="md:flex mb-8">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <label className="input-group">
                <input type="text" placeholder="Category" name="category" className="input input-bordered w-full" />
              </label>
            </div>
            <div className="form-control md:w-1/2 ml-4">
              <label className="label">
                <span className="label-text">Details</span>
              </label>
              <label className="input-group">
                <input type="text" placeholder="Details" name="details" className="input input-bordered w-full" />
              </label>
            </div>
          </div>
          {/* form row photo url */}
          <div className="mb-8">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <label className="input-group">
                <input type="text" placeholder="Photo URL" name="photo" className="input input-bordered w-full" />
              </label>
            </div>
          </div>
          <input type="submit" className="btn btn-block" value="Add Coffee" />
        </form>
      </div>
    );
  };
  
  export default AddCoffee;
  