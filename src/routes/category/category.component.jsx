import "./category.styles.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

const Category = () => {
  const { category } = useParams();
  console.log("category component");
  console.log(category);
  const categoriesMap = useSelector(selectCategoriesMap);

  console.log("categoriesMap");
  console.log(categoriesMap);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <div className='category-container'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Category;
