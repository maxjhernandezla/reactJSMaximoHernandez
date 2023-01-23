import * as React from "react";
import { useEffect, useState } from "react";
import "./ItemListContainer.scss";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

export const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const productosRef = collection(db, "productos");
    const q = categoryId
      ? query(productosRef, where("category", "==", categoryId))
      : productosRef;

    getDocs(q).then((res) => {
      setProducts(
        res.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })
      );
    });
  }, [categoryId]);

  return (
    <div className="itemListContainer">
      <div>
        <ItemList products={products} title={categoryId} />
      </div>
    </div>
  );
};

// useEffect(() => {
//   askData()
//     .then((res) => {
//       if (categoryId) {
//         setProducts(res.filter((prod) => prod.category === categoryId));
//       } else {
//         setProducts(res);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, [categoryId]);
