import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { useRef, useEffect } from 'react';
import { Link } from 'react-router';

export function CartModal(props) {
    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                props.setModalState(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props]);

    return (

        <div ref={modalRef} className="bg-white px-4 py-2 border-4 shadow-md border-gray-300 shadow-gray-500 rounded-lg w-100 h-fit max-h-[80vh] overflow-y-auto fixed top-12 right-[2%] sm:right-7">
            <button onClick={() => props.setModalState(false)} className='absolute top-1 right-1 cursor-pointer text-gray-600 hover:text-gray-900'>
                <XMarkIcon className='w-7 h-7' />
            </button>
            <h2 className='text-2xl font-bold mb-4'>Shopping Cart ({props.cart.length})</h2>
            {props.cart.length === 0 ? (
                <p className='text-center text-gray-500'>Your Cart is Empty</p>
            ) : (
                <>
                    {props.cart.map((item) => (
                        <div key={item.id} className='flex justify-between items-center border-b py-2'>
                            < div className='flex items-center space-x-4'>
                                <img src={item.image} alt={item.title} className='max-h-16 w-18 object-contain' />
                                <div>
                                    <h3 className='font-semibold line-clamp-1 w-48' title={item.title}>{item.title}</h3>
                                    <div className='flex gap-x-0.5 items-center'>
                                        <span className='text-gray-600 px-1'>₹{item.price} x </span>
                                        <button onClick={() => props.decreaseQuantity(item)} className="bg-gray-200 hover:bg-gray-300 rounded-xs">
                                            <MinusIcon className='w-4 h-4' />
                                        </button>
                                        <span className='px-1'>{item.quantity}</span>
                                        <button onClick={() => props.increaseQuantity(item)} className="bg-gray-200 hover:bg-gray-300 rounded-xs">
                                            <PlusIcon className='w-4 h-4' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => props.removeCart(item)} className='text-red-500 hover:text-red-700'>Remove</button>
                        </div>
                    ))}
                    <div className='mt-4 flex justify-between font-bold'>
                        <span>Total:</span>
                        <span>₹ {props.total}</span>
                    </div>
                    <Link to="cart"><button onClick={() => props.setModalState(false)} className='w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>Checkout</button></Link>
                    <p>(Note: Click Checkout button to route to full cart)</p>
                </>
            )}
        </div>
    )
}