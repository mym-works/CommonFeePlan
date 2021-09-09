import Price from './price'
import utilStyles from '../styles/utils.module.css'

interface Props {
  items: any[],
  update: (items: any[]) => void
}

export default function Item({ items, update }: Props): JSX.Element {

  const addItem = () => {
    update([
      {
        name: "",
        quantity: 1,
        price: '',
        thumbnail: '',
        editing: true
      },
      ...items
    ])
  }

  const editItem = (index, name, value) => {
    items[index][name] = value

    if (name === 'editing' && value === false) {
      setThumbnail(index)
    }

    update(Object.assign([], items))
  }

  const setThumbnail = async (index) => {
    fetch('https://pixabay.com/api/?key=20028294-070cb605b6300a57fd29bffc5&image_type=photo&q=' + encodeURIComponent(items[index].name)).then(response => response.json()).then((result) => {
      console.log(result)
      editItem(index, 'thumbnail', result.hits[0].largeImageURL) // previewURL)
    })
  }

  return (
    <div>
      <ul>
        <li className="add" onClick={addItem}>
          <img src="/images/icon-plus.svg" />
          Add item
        </li>
        {
          items.map((item, index) => {
            return <li key={index}>
              {
                !item.editing
                  ? <div className="item">
                    <button className="btn-edit" onClick={event => editItem(index, 'editing', true)}>
                      <img src="/images/icon-edit.svg" />
                    </button>
                    <img className="thumbnail" src={item.thumbnail} />
                    {
                      // <p>Daily essentials</p>
                    }
                    <h2>{item.name}</h2>
                    <p className="quantity">x {item.quantity}</p>
                    <Price price={item.price} size="middle" />
                  </div>

                  : <div className="edit">
                    <label>Item Name<input className={utilStyles.input} type="text" placeholder="Tap to enter" value={item.name} onChange={event => editItem(index, 'name', event.target.value)} /></label>
                    <label>Item Price<span className="currency">¥</span><input className={utilStyles.input + ' price'} type="text" pattern="\d*" min="0" step="1" placeholder="Tap to enter" value={item.price} onChange={event => editItem(index, 'price', parseInt(event.target.value ? event.target.value.substr(0, 6) : '0'))} /></label>
                    <label>Quantity
                      <select className={utilStyles.input} value={item.quantity} onChange={event => editItem(index, 'quantity', parseInt(event.target.value))}>
                        {
                          [...Array(100)].map((_, i) => i + 1).map((value, key) => {
                            return <option key={key} value={value}>{value}</option>
                          })
                        }
                      </select>
                    </label>
                    <button className={utilStyles['btn-submit'] + ' btn-submit'} onClick={event => editItem(index, 'editing', false)} disabled={!item.name}>OK</button>
                  </div>
              }
            </li>
          })
        }
      </ul>

      <style jsx>{`
            ul {
                display: flex;
                overflow-x: scroll;
                padding-bottom: 10px; /* for shadow */
            }

            .add,
            .item,
            .edit {
                min-width: 154px;
                min-height: 280px;
                margin-right: 10px;
                border-radius: 10px;
            }

            .add {
                text-align: center;
                color: #FF7A00;
                padding-top: 100px;
                border: 1px solid #FF7A00;
                box-sizing: border-box;
            }
            .add img {
                margin: 0 auto;
                margin-bottom: 30px;
            }

            .item {
                text-align: center;
                position: relative;
                padding: 20px;
                box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.1);
border-radius: 10px;
            }
            .item .btn-edit {
                position: absolute;
                right: 5px;
                top: 5px;
            }
            .item .thumbnail {
                height: 114px;
                clip-path: circle(50%);
                margin-bottom: 30px;
            }
            .item h2 {
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 10px;
                line-height: 1;
            }
            .item .quantity {
                font-size: 14px;
                line-height: 1;
                margin-bottom: 20px;
            }
            
            .edit {
                padding: 16px;
                border: 1px solid #FF7A00;
                box-sizing: border-box;
            }
            .edit label {
                font-size: 12px;
                color: #FF7A00;
                margin-bottom: 16px;
                display: block;
                line-height: 1;
            }
            .edit input, .edit select {
                margin-top: 10px;
                font-size: 14px;
                color: black;
                border-bottom: 1px solid #F5F5F5;
            }
            .edit .currency {
                display: block;
                color: black;
                z-index: 1;
                position: relative;
                margin-bottom: -24px;
                margin-top: 10px;
                font-size: 16px;
            }
            .edit .price {
                text-align: right;
            }
            .edit .btn-submit {
                font-size: 14px;
                padding: 10px 0;
                margin-top: 30px;
            }
            
        `}</style>
    </div>
  )
}