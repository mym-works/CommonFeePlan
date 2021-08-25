interface Props{
  price: number,
  size?: string
}

export default function Price({ price, size }: Props): JSX.Element {
  return (
    <div className="text-center">
        <p className={"price leading-none" + (size !== 'middle' ? ' text-4xl' : ' text-3xl')}><span>{price.toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,')}</span></p>
        {
            // <p className="text-xs leading-none text-gray">Common fee</p>
        }

        <style jsx>{`
            .price::before {
                content: "¥";
                position: relative;
                left: -4px;
                top: -0.8em;
                font-size: 18px;
            }
            .price.text-3xl::before {
                font-size: 14px;

            }
        `}</style>
    </div>
    )
}