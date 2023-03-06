import { useState } from "react";
import { api } from "../../api/api.js";
import { useNavigate } from "react-router-dom";

export function Create() {
  const formBody = {
    width: "25rem",
    margin: "2rem",
  };

  const btnCreate = {
    margin: "1.5rem",
  };

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    photo: "",
  });

  const [img, setImg] = useState("");
  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);
      const response = await api.post("/upload_image", uploadData);
      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const imgURL = await handleUpload();
      await api.post("/product/create_product", { ...form, photo: imgURL });
      navigate("/list");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <center>
      <h1>Create new product</h1>
      <form style={formBody} onSubmit={handleSubmit}>
        <div className={"mb-3"}>
          <label htmlFor="input-name" className={"form-label"}>
            name:
          </label>
          <input
            type="text"
            className={"form-control"}
            id="input-name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className={"mb-3"}>
          <label htmlFor="input-description" className={"form-label"}>
            description:
          </label>
          <input
            className={"form-control"}
            id="input-description"
            name="description"
            defaultValue={form.description}
            onChange={handleChange}
            type="text"
          ></input>
        </div>

        <div className={"mb-3"}>
          <label htmlFor="input-price" className={"form-label"}>
            Price:
          </label>
          <input
            type="Number"
            className={"form-control"}
            id="input-price"
            name="price"
            defaultValue={form.price}
            onChange={handleChange}
          ></input>
        </div>

        <label style={{ margin: "1rem" }} htmlFor="formImg">
          product picture:
        </label>
        <input type="file" id="formImg" onChange={handleImage} />

        <button style={btnCreate} type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </center>
  );
}
