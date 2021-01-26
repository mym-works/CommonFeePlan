import Head from 'next/head'

interface Props{
  children: JSX.Element[],
  pageName?: string,
  pageDescription?: string,
  pageHero?: string,
}

export default function Layout(props: Props): JSX.Element {
  return (
    <div className="px-5 py-10">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <title>{props.pageName.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')}</title>
      </Head>

      <header className="mb-10">
        { props.pageName && <h1 className="mb-5 leading-none text-3xl font-bold" dangerouslySetInnerHTML={{__html: props.pageName}}></h1> }
        { props.pageDescription && <p className="mb-8 text-sm text-gray" dangerouslySetInnerHTML={{__html: props.pageDescription}}></p> }
        { props.pageHero && <img src={props.pageHero} /> }
      </header>

      <main>
          {props.children}
      </main>
    </div>
    )
}