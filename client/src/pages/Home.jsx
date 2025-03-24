import { useState, useEffect } from 'react'
import { fetchFromApi } from '../utils/fetchFromApi'
import { Hero, Products, Quote, ImageCard, Footer } from '../components/index'

const Home = () => {

    const [saleItems, setSaleItems] = useState([])
    const [newProducts, setNewProducts] = useState([])

    useEffect(() => {
        fetchFromApi(`products?limit=4`)
            .then((data) => setSaleItems(data))
            .catch((error) => console.error('Error fetching deals products:', error));

        fetchFromApi(`products?limit=12`)
            .then((data) => setNewProducts(data))
            .catch((error) => console.error('Error fetching deals products:', error));
    }, [])

    return (
        <div>
            <Hero />
            <Products title="Flash Sale" products={saleItems} />
            <Quote />
            <ImageCard />
            <Products title="New Products" products={newProducts} />
            <Footer />

        </div>
    )
}

export default Home