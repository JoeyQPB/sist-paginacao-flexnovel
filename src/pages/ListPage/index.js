import { useEffect, useState } from "react";
import { api } from "../../api/api";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

export function List() {
  const cardDiv = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2rem",
    marginTop: "2rem",
  };

  const ImgStyle = {
    objectfFit: "cover",
  };

  const [product, setProduct] = useState([
    {
      name: "",
      description: "",
      price: 0,
      photo: "",
      _id: "",
    },
  ]);

  useEffect(() => {
    async function fetchproduct() {
      const response = await api.get("/product/list");
      setProduct(response.data);
    }

    fetchproduct();
  }, []);

  return (
    <>
      <div style={cardDiv}>
        <center>
          <Card
            style={{
              width: "18rem",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: "3rem",
            }}
          >
            <Card.Body>
              <h4 className={"card-title"}> Create new product</h4>
              <Link
                to={`/create`}
                className={"btn btn-success"}
                style={{
                  marginTop: "1.3rem",
                  borderRadius: "2rem",
                  height: "4rem",
                  width: "4rem",
                  fontSize: "2rem",
                  textAlign: "center",
                }}
              >
                +
              </Link>
            </Card.Body>
          </Card>
        </center>

        {product.map((product) => {
          return (
            <div key={product._id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" style={ImgStyle} src={product.photo} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Price: {product.price} </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}
