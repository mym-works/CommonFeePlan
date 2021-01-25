import Price from './price'

export default function Item() {
  return (
    <div>
        <ul>
            <li className="add">
                <img src="/images/icon-plus.svg" />
                Add Item
            </li>
            <li className="add">
                <label>Item Name<input type="text" /></label>
                <label>Item Price<input type="number" /></label>
                <label>Quantity<input type="number" /></label>
            </li>
            <li className="item">
                <button>
                    <img src="/images/icon-plus.svg" />
                </button>
                <img src="/images/icon-plus.svg" />
                <p>Daily essentials</p>
                <h2>Toilet Paper</h2>
                <Price price="400" />
            </li>
        </ul>

        <style jsx>{`
        `}</style>
    </div>
    )
}