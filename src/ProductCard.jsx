import { StarIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router'

export function ProductCard(props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-xl">
      <Link to={`/product/${props.product.id}`}><img className="w-full h-48 object-contain rounded-md mb-4" src={props.product.image} alt={props.product.title} /></Link>
      <div>
        <Link to={`/product/${props.product.id}`}>
          <h3 className="text-lg font-semibold line-clamp-2" title={props.product.title}>{props.product.title}</h3>
          <div className='flex justify-between'>
            <div className="text-gray-700">₹ {props.product.price}</div>
            <div className="flex items-center gap-2">
              <span>({props.product.rating.count})</span>
              <span className={`flex items-center px-1 rounded text-white ${getRatingColor(props.product.rating.rate)}`}>
                {props.product.rating.rate}
                <StarIcon className="size-5 text-white" />
              </span>
            </div>
          </div>
        </Link>
        <button onClick={() => { props.addToCart(props.product) }} className='w-full mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>Add to cart</button>
      </div>
    </div>
  )
}

function getRatingColor(rating) {
  if (rating >= 4) {
    return 'bg-green-600';
  } else if (rating >= 2) {
    return 'bg-yellow-600';
  } else {
    return 'bg-red-600';
  }
}
