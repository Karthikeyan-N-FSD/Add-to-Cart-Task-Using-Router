import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router'

export function Navbar(props) {

    return (
        <nav className="bg-gray-800 text-white px-7 py-1 fixed w-full flex justify-between items-center shadow-md">
            <Link to={"/"} className="flex items-center gap-1">
                <img className="w-10 rounded-full" src="/logo.webp"></img>
                <p className="font-semibold text-xl">KAZ Store</p>
            </Link>
            <button
                type="button"
                className="relative"
                onClick={() => props.setModalState(true)}
                aria-label="Open cart modal"
            >
                <ShoppingCartIcon className="w-11 h-11" />
                <span className='absolute top-1.75 right-3.25 text-[#52FFFF] font-bold text-sm'>{props.cart.length}</span>
            </button>
        </nav>
    )
}