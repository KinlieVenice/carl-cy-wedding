import ImageContainer from "../../components/ImageContainer";
import Countdown from "../../components/Countdown";
import WeddingHeader from "../../components/WeddingHeader";
import NotebookCarousel from "../../components/NotebookCarousel";
import FilmStrip from "../../components/FilmStrip";
import BookHalfSlider from "../../components/BookHalfSlider";

function Home () {
    return (
      <>
        <section className="bg-[url('/images/banner_bg.jpg')] bg-cover bg-position-[55%_55%] bg-no-repeat h-[90dvh]">
          <div>
            <WeddingHeader
              coupleName="Carl & Cy"
              weddingDate="June 14, 2025" // optional subtitle
            />
          </div>
          <div className="relative flex flex-col items-center pt-10 justify-start h-full">
            <ImageContainer height={220} rotation={-4}>
              <img
                src="/images/banner_inv.png"
                alt=""
                className="h-full object-cover"
              />
            </ImageContainer>
            <ImageContainer height={200} rotation={1}>
              <img
                src="/images/banner_pic.png"
                alt=""
                className="h-full object-cover"
              />
            </ImageContainer>
            <Countdown targetDate="2026-11-26T00:00:00" />
            <ImageContainer
              className="absolute -bottom-30 z-10 object-cover"
              height={300}
            >
              <img
                src="/images/scrapaper.png"
                alt=""
                className="h-full w-full object-cover object-left"
              />
            </ImageContainer>
          </div>
        </section>
        <section>
          <div className="relative">
            <ImageContainer className="mt-38">
              <img
                src="/images/bride-cy.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </ImageContainer>
            <ImageContainer
              className="absolute -bottom-17 z-10 object-cover"
              height={100}
            >
              <img
                src="/images/scrapaper.png"
                alt=""
                className="h-full w-full object-cover object-left"
              />
            </ImageContainer>
          </div>
          <div className="relative">
            <ImageContainer className="relative z-20">
              <img
                src="/images/groom-carl.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </ImageContainer>
            <ImageContainer
              className="absolute -bottom-40 z-30 object-cover"
              height={200}
            >
              <img
                src="/images/scrapaper.png"
                alt=""
                className="h-full w-full object-cover object-left"
              />
            </ImageContainer>
          </div>
        </section>
        <section className="bg-[url('/images/story-bg.jpg')] bg-cover bg-position-[1%_1%] bg-no-repeat h-[80dvh] mt-26">
          <div className="flex items-center justify-center h-full px-4">
            <BookHalfSlider />
          </div>
        </section>
        <section>
          <div className="relative">
            <FilmStrip />
            <ImageContainer
              className="absolute -top-34 object-cover"
              height={600}
            >
              <img
                src="/images/scrapaper.png"
                alt=""
                className="h-full w-full object-cover object-left"
              />
            </ImageContainer>
          </div>
        </section>

        <section className="bg-[url('/images/story-bg.jpg')] bg-cover bg-position-[1%_1%] bg-no-repeat h-[65dvh]">
          <div className="relative">
            <ImageContainer>
              <img src="/images/wed-deets.png" alt="" />
            </ImageContainer>
            <ImageContainer
              className="absolute -bottom-35 object-cover"
              height={150}
            >
              <img
                src="/images/scrapaper.png"
                alt=""
                className="h-full w-full object-cover object-left"
              />
            </ImageContainer>
          </div>
        </section>
        <section className="bg-[url('/images/story-bg.jpg')] bg-cover bg-position-[1%_1%] bg-no-repeat h-[65dvh]">
          <div className="relative"></div>
        </section>
      </>
    );
}

export default Home;