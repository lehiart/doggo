import SearchCommand from '../../components/search-command'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="container flex flex-col items-center gap-4 py-10  md:flex-row md:py-0  h-screen md:justify-center">
      <section>
        <div className="flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading mb-16 text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-center animate-slide-down">
            Encuentra todo lo que <br />
            necesitas para tu perro
          </h1>

          <SearchCommand className="animation-delay-[300ms]" />

          <div className="text-xl md:text-4xl [text-wrap:balance] mt-10  animate-slide-down animation-delay-[500ms]">
            <p>
              Somos el directorio de servicios <br /> para tu{' '}
              <span className="animate-word-animation">perro</span>
            </p>
            <p>más grande de México.</p>
          </div>

          <Image
            src="/images/hero.png"
            width={600}
            height={600}
            alt="Una persona sentada en un escritorio con una computadora y un perro a su lado"
          />
        </div>
      </section>
    </main>
  )
}
