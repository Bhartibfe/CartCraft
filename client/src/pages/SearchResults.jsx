import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromApi } from '../utils/fetchFromApi'
import { ProductCard } from '../components/index'

const SearchResults = () => {

    const { category } = useParams()
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        fetchFromApi(`products/category/${category}`)
            .then((data) => setSearchResult(data))
    })

    return (
        <div className='py-7'>
            <h1 className='font-semibold text-base md:text-lg mb-3 text-gray-700 px-8'>
                Showing results for <span className='text-purple-800'>{category.toUpperCase()}</span>
            </h1>
            <div className='flex flex-row items-center justify-center gap-4 md:gap-8 flex-wrap'>
                {searchResult.map((item) => (
                    <div key={item.id} className="bg-white flex flex-col items-start h-[28vh] w-[40%] rounded-lg md:w-[20%] md:h-[70vh]">
                        <ProductCard product={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchResults