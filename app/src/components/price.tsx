export default function Price({ price }) {
  return (
    <div className="text-center">
        <p className="price leading-none text-4xl"><span>{price.toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,')}</span></p>
        {
            // <p className="text-xs leading-none text-gray">Common fee</p>
        }

        <style jsx>{`
            .price::before {
                content: "¥";
                font-size: 18px;
                position: relative;
                left: -4px;
                top: -0.8em;
            }
        `}</style>
    </div>
    )
}