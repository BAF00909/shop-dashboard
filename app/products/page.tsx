import { ProductsContainer } from "./components/products-container/products-continer";
import styles from "./products.module.css";

export default async function ProductsPage() {
	return (
		<div className={styles.productsPage}>
			<h2>Продукты</h2>
			<ProductsContainer/>
		</div>
	)
}