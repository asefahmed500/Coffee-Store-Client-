import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee }) => {
    const { _id, name, quantity, supplier, taste, category, details, photo } = coffee;

    const handledelete = (_id) => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/coffee/${_id}`, {
                    method: 'DELETE',
                })
                    .then((res) => {
                        if (!res.ok) {
                            return res.text().then(text => { throw new Error(text) });
                        }
                        return res.json();
                    })
                    .then((data) => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your file has been deleted.", "success");
                            
                        } else {
                            Swal.fire("Error!", "Unable to delete the coffee item.", "error");
                        }
                    })
                    .catch((error) => {
                        console.error('There was a problem with the fetch operation:', error);
                        Swal.fire("Error!", `Something went wrong: ${error.message}`, "error");
                    });
            }
        });
    };

    return (
        <div className="card card-side gap-4 bg-base-100 shadow-xl">
            <figure>
                <img className="w-[185px] h-[239px]" src={photo} alt="" />
            </figure>
            <div className="flex justify-between w-full pr-4">
                <div>
                    <h2 className="card-title">{name}</h2>
                    <p>Details: {details}</p>
                    <p>Quantity: {quantity}</p>
                    <p>Supplier: {supplier}</p>
                    <p>Taste: {taste}</p>
                    <p>Category: {category}</p>
                </div>
                <div className="card-actions justify-end">
                    <div className="join join-vertical space-y-10">
                        <button className="btn join-item">View</button>
                        <Link to={`updatedcoffee/${_id}`}
                        >  <button className="btn join-item">Edit</button></Link>
                        <button onClick={() => handledelete(_id)} className="btn join-item bg-orange-500">
                            X
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;
