import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import "./WorkoutForm.css";
const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [name, setTitle] = useState("");
  const [model, setLoad] = useState("");
  const [amount, setReps] = useState("");
  const [count, setCount] = useState("");
  const [place, setPlace] = useState("");
  const [warentty_date, setwarentty_date] = useState("");
  const [image, setImage] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isInUploaded, setIsinUploaded] = useState(false);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
    setIsImageUploaded(false);
  };
  const handleFileChange1 = (event) => {
    setInvoice(event.target.files[0]);
    setIsinUploaded(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const formData = new FormData();
    formData.append("files", image);
    formData.append("name", name);
    formData.append("model", model);
    formData.append("amount", amount);
    formData.append("count", count);
    formData.append("place", place);
    formData.append("warentty_date", warentty_date);
    formData.append("files", invoice);

    try {
      const response = await fetch("/datas", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        setError(null);
        setTitle("");
        setLoad("");
        setReps("");
        setCount("");
        setPlace("");

        setwarentty_date("");
        dispatch({ type: "CREATE_WORKOUT", payload: json });
      }
      alert("Workout details added successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while submitting the form.");
    }
  };
  return (
    <>
      <div className="container">
        <form className="create" onSubmit={handleSubmit}>
          <h3>Add a New product</h3>

          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={name}
            className="element name"
            placeholder="Product Name"
          />
          <input
            type="text"
            onChange={(e) => setLoad(e.target.value)}
            value={model}
            className="element model"
            placeholder="Model"
          />
          <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={amount}
            className="element amount"
            placeholder="Amount"
          />

          <input
            type="number"
            onChange={(e) => setCount(e.target.value)}
            value={count}
            className="element count"
            placeholder="Count"
          />

          <input
            type="text"
            onChange={(e) => setPlace(e.target.value)}
            value={place}
            className="element place"
            placeholder="Place"
          />

          <input
            type="date"
            onChange={(e) => setwarentty_date(e.target.value)}
            value={warentty_date}
            className="element date"
            placeholder="Warentty Date"
          />

          <input
            type="text"
            className="upload"
            value="Upload Image :"
            readOnly
          />

          <input
            type="file"
            onChange={handleFileChange}
            className="element image"
          />

          {/* invoice */}
          <input
            type="text"
            className="upload"
            value="Upload Invoice :"
            readOnly
          />

          <input
            type="file"
            onChange={handleFileChange1}
            className="element invoice"
          />

          <button className="addproject">Add </button>
          {error && <div className="error">{error}</div>}

          {isImageUploaded && (
            <div className="alert">
              <p>Image and details uploaded successfully!</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default WorkoutForm;
