import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../tickets/Locations"
import { ProductList } from "../tickets/ProductList"
import { ProductForm } from "../tickets/ProductForm"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>
					<div>Your one-stop shop for all your Kandy Needs</div>


					<Outlet />
				</>
			}>
			<Route path="Locations" element={ <LocationList />} />
			<Route path="ProductList" element={ <ProductList />} />
			<Route path="ProductForm" element={ <ProductForm />} />
			</Route>
		</Routes>
	)
}

