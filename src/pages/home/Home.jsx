import ImageContainer from "../../components/ImageContainer";
import Countdown from "../../components/Countdown";
import WeddingHeader from "../../components/WeddingHeader";
import NotebookCarousel from "../../components/NotebookCarousel";
import FilmStrip from "../../components/FilmStrip";
import BookHalfSlider from "../../components/BookHalfSlider";
import ScrapbookFAQ from "../../components/ScrapbookFAQ";
import PolaroidSlider from "../../components/PolaroidSlider";
import WeddingTimeline from "../../components/WeddingTimeline";
import DressCodePicker from "../../components/DressCodePicker";
import PolaroidCard from "../../components/PolaroidCard";

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

        <section className="bg-[url('/images/story-bg.jpg')] bg-cover bg-position-[1%_1%] bg-no-repeat">
          <div className="relative pb-10">
            <div className="flex flex-col gap-10">
              <ImageContainer>
                <img src="/images/wed-deets.png" alt="" />
              </ImageContainer>
              <div className="flex flex-col gap-5 pb-15 px-8">
                <ImageContainer>
                  <img src="/images/chapel-h.png" alt="" />
                </ImageContainer>
                <ImageContainer>
                  <img src="/images/windsong-t.png" alt="" />
                </ImageContainer>
              </div>
            </div>
            <ImageContainer
              className="absolute -bottom-34 object-cover"
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

        <section className="bg-[url('/images/story-bg.jpg')] bg-cover bg-position-[1%_1%] bg-no-repeat">
          <div className="relative pt-40">
            <div className="flex flex-col gap-8 pb-20 px-12">
              <ImageContainer className="shadow-xl">
                <img src="/images/ento1.png" alt="" />
              </ImageContainer>
              <ImageContainer className="shadow-xl">
                <img src="/images/ento2.png" alt="" />
              </ImageContainer>
              <ImageContainer className="shadow-xl">
                <img src="/images/ento3.png" alt="" />
              </ImageContainer>
              <ImageContainer className="shadow-xl">
                <img src="/images/timeline.png" alt="" />
              </ImageContainer>
            </div>

            <ImageContainer
              className="absolute -bottom-34 object-cover"
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

        <section className="bg-[url('/images/story-bg.jpg')] bg-cover bg-no-repeat flex flex-col gap-20 pb-70 overflow-hidden">
          <div className="relative flex flex-col gap-40">
            {/* LEFT */}
            <div className="flex justify-start mt-50">
              <PolaroidCard
                image="/images/dress.png"
                rotation={-6}
                colors={["#b8a48c", "#7d6e83"]}
                scrapPosition="outside-bottom"
                scrapWidth={300}
                scrapHeight={300}
                scrapRotation={12}
                scrapClassName="translate-y-40 -translate-x-45"
                scrapTextMaxWidth={250}
                scrapTextClassName="pl-10 text-start"
                tapeText="Parents of the Couple"
                scrapText={[
                  "Semi-formal attire",
                  "Earth tones preferred",
                  "Avoid white outfits",
                  "Comfortable footwear",
                ]}
              />
            </div>

            {/* RIGHT */}
            <div className="flex justify-end">
              <PolaroidCard
                image="/images/dress.png"
                rotation={6}
                colors={["#b8a48c", "#7d6e83"]}
                scrapPosition="outside-bottom"
                scrapWidth={400}
                scrapHeight={300}
                scrapRotation={-20}
                scrapClassName="translate-y-40 -translate-x-50"
                scrapTextMaxWidth={300}
                scrapTextClassName="pl-10"
                tapeText="Parents of the Couple"
                scrapText={[
                  "Semi-formal attire",
                  "Earth tones preferred",
                  "Avoid white outfits",
                  "Comfortable footwear",
                ]}
              />
            </div>

            {/* LEFT */}
            <div className="flex justify-start">
              <PolaroidCard
                image="/images/dress.png"
                rotation={-6}
                colors={["#b8a48c", "#7d6e83"]}
                scrapPosition="outside-bottom"
                scrapWidth={300}
                scrapHeight={300}
                scrapRotation={-2}
                scrapClassName="translate-y-40 -translate-x-20"
                scrapTextMaxWidth={250}
                scrapTextClassName="pl-10 text-start"
                tapeText="Parents of the Couple"
                scrapText={[
                  "Semi-formal attire",
                  "Earth tones preferred",
                  "Avoid white outfits",
                  "Comfortable footwear",
                ]}
              />
            </div>

            {/* RIGHT */}
            <div className="flex justify-end">
              <PolaroidCard
                image="/images/dress.png"
                rotation={6}
                colors={["#b8a48c", "#7d6e83"]}
                scrapPosition="outside-left"
                scrapWidth={500}
                scrapHeight={300}
                scrapRotation={-12}
                scrapClassName="translate-y-14"
                scrapTextMaxWidth={350}
                scrapTextClassName="pl-10"
                tapeText="Parents of the Couple"
                scrapText={[
                  "Semi-formal attire",
                  "Earth tones preferred",
                  "Avoid white outfits",
                  "Comfortable footwear",
                ]}
              />
            </div>

            {/* LEFT */}
            <div className="flex justify-start">
              <PolaroidCard
                image="/images/dress.png"
                rotation={-6}
                colors={["#b8a48c", "#7d6e83"]}
                scrapPosition="outside-bottom"
                scrapWidth={300}
                scrapHeight={300}
                scrapRotation={12}
                scrapClassName="translate-y-40 -translate-x-45"
                scrapTextMaxWidth={250}
                scrapTextClassName="pl-10 text-start"
                tapeText="Parents of the Couple"
                scrapText={[
                  "Semi-formal attire",
                  "Earth tones preferred",
                  "Avoid white outfits",
                  "Comfortable footwear",
                ]}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="relative">
            <ImageContainer
              className="absolute -top-34 object-cover"
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

        <section className="bg-[url('/images/story-bg.jpg')] bg-cover bg-position-[1%_1%] bg-no-repeat">
          <div className="relative pt-20">
            <div className="flex flex-col gap-8 pb-20 px-5">
              <ScrapbookFAQ></ScrapbookFAQ>
            </div>
          </div>
        </section>
      </>
    );
}

export default Home;