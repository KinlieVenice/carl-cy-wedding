import { useState } from "react";
import ImageContainer from "../../components/ImageContainer";
import Countdown from "../../components/Countdown";
import WeddingHeader from "../../components/WeddingHeader";
import NotebookCarousel from "../../components/NotebookCarousel";
import FilmStrip from "../../components/FilmStrip";
import PagePeelStack from "../../components/PagePeelStack";
import ScrapbookFAQ from "../../components/ScrapbookFAQ";
import PolaroidSlider from "../../components/PolaroidSlider";
import WeddingTimeline from "../../components/WeddingTimeline";
import DressCodePicker from "../../components/DressCodePicker";
import PolaroidCard from "../../components/PolaroidCard";
import RSVPModal from "../../components/RSVPModal";
import StickyControls from "../../components/StickyControls";
import Sticker from "../../components/Sticker";

function Home () {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [color1, setColor1] = useState("#6c3f2e");
  const [color2, setColor2] = useState("#f3e0c7");
  const [color3, setColor3] = useState("#808000");
  const [color4, setColor4] = useState("#cdc1ba");
  const [color5, setColor5] = useState("#cdc1ba");

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');`}</style>
      <WeddingHeader
        coupleName="Carl & Cy"
        weddingDate="November 26, 2026"
        onRSVP={() => setIsRSVPOpen(true)}
      />
      <section
        id="home"
        className="bg-[url('/images/banner_bg_sm.webp')] bg-cover bg-no-repeat bg-position-[55%_55%] h-[650px]"
      >
        <div className="relative flex flex-col items-center pt-8 justify-start h-full">
          <div className="w-full flex justify-center">
            <div style={{ position: "relative", width: "fit-content", height: "210px" }}>
              <ImageContainer height={210} rotation={-4}>
                <img
                  src="/images/banner_inv.webp"
                  alt=""
                  className="h-full object-cover"
                  fetchpriority="high"
                  loading="eager"
                />
              </ImageContainer>
              <Sticker
                src="/STICKERS/MONOG.webp"
                width={90}
                bottom="-40px"
                left="-5px"
                rotate={-8}
                zIndex={20}
              />
            </div>
          </div>
          <ImageContainer height={185} rotation={1}>
            <img
              src="/images/banner_pic.webp"
              alt=""
              className="h-full object-cover"
              fetchpriority="high"
              loading="eager"
            />
          </ImageContainer>
          <Countdown targetDate="2026-11-26T00:00:00" />
          <ImageContainer
            className="absolute -bottom-35 z-10 object-cover"
            height={170}
          >
            <div
              style={{ position: "relative", height: "100%", width: "100%" }}
            >
              <Sticker
                src="/STICKERS/19.webp"
                width={250}
                bottom="-50px"
                right="-80px"
                rotate={-20}
                zIndex={30}
              />
              <img
                src="/images/scrapaper.webp"
                alt=""
                className="h-full w-full object-cover object-left"
              />
              <button
                onClick={() => setIsRSVPOpen(true)}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "1rem",
                  letterSpacing: "0.22em",
                  color: "#fffdf8",
                  border: "1.5px solid rgba(255,253,248,0.6)",
                  background: "#722F37",
                  padding: "0.40rem 1.8rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  borderRadius: "2px",
                  boxShadow: "0 4px 18px rgba(114,47,55,0.45)",
                  transition: "background 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#5a2029";
                  e.currentTarget.style.boxShadow =
                    "0 6px 24px rgba(114,47,55,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#722F37";
                  e.currentTarget.style.boxShadow =
                    "0 4px 18px rgba(114,47,55,0.45)";
                }}
              >
                RSVP Now
              </button>
            </div>
          </ImageContainer>
        </div>
      </section>

      <section id="our-story">
        <div className="relative">
          <div className="relative">
            <ImageContainer className="mt-25">
              <img
                src="/images/bride-cy.webp"
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </ImageContainer>
            <Sticker
              src="/STICKERS/camera.webp"
              width={170}
              bottom="-75px"
              right="10px"
              rotate={-10}
              zIndex={40}
            />
            <Sticker
              src="/STICKERS/15.webp"
              width={180}
              bottom="-85px"
              left="-90px"
              rotate={-12}
              zIndex={40}
            />
          </div>
          <ImageContainer
            className="absolute -bottom-17 z-10 object-cover"
            height={100}
          >
            <img
              src="/images/scrapaper.webp"
              alt=""
              className="h-full w-full object-cover object-left"
              loading="lazy"
            />
          </ImageContainer>
        </div>
        <div className="relative">
          <ImageContainer className="relative z-20">
            <img
              src="/images/groom-carl.webp"
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </ImageContainer>
          <ImageContainer
            className="absolute -bottom-40 z-30 object-cover"
            height={200}
          >
            <div
              style={{ position: "relative", height: "100%", width: "100%" }}
            >
              <img
                src="/images/scrapaper.webp"
                alt=""
                className="h-full w-full object-cover object-left"
              loading="lazy"
              />
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
                  color: "#722F37",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  textShadow: "0 1px 6px rgba(255,253,248,0.6)",
                }}
              >
                Our Story
              </span>
            </div>
          </ImageContainer>
        </div>
      </section>

      <section className="bg-[url('/images/story-bg-sm-cp.webp')] bg-cover bg-position-[1%_1%] bg-no-repeat h-[800px] mt-26">
        <div className="flex items-start justify-center h-full w-90 pt-20 mx-auto">
          <PagePeelStack />
        </div>
      </section>

      <section id="gallery" className="pt-5">
        <div className="relative">
          <FilmStrip />
          <ImageContainer
            className="absolute -top-34 object-cover"
            height={600}
          >
            <img
              src="/images/scrapaper.webp"
              alt=""
              className="h-full w-full object-cover object-left"
              loading="lazy"
            />
          </ImageContainer>
        </div>
      </section>

      <section
        id="wedding-overview"
        className="bg-[url('/images/banner5cp.webp')] bg-cover bg-no-repeat bg-[position:50%_top] relative z-10"
      >
        <div className="relative pb-10 flex flex-col items-center">
          <div className="flex flex-col items-center gap-10">
            <div className="relative">
              <ImageContainer>
                <img src="/images/wed-deets.webp" alt="" loading="lazy" className="w-80"/>
              </ImageContainer>
              <Sticker
                src="/STICKERS/32.webp"
                width={220}
                top="-35px"
                right="-105px"
                rotate={-12}
                zIndex={20}
              />
            </div>
            <div className="flex flex-col items-center gap-5 pb-15">
              <ImageContainer>
                <img
                  src="/images/chapel-h.webp"
                  alt=""
                  loading="lazy"
                  className="w-80"
                />
              </ImageContainer>
              <ImageContainer>
                <img
                  src="/images/windsong-t.webp"
                  alt=""
                  loading="lazy"
                  className="w-80"
                />
              </ImageContainer>
            </div>
          </div>
          <ImageContainer
            className="absolute -bottom-34 object-cover"
            height={200}
          >
            <div
              style={{ position: "relative", height: "100%", width: "100%" }}
            >
              <img
                src="/images/scrapaper.webp"
                alt=""
                className="h-full w-full object-cover object-left"
              loading="lazy"
              />
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
                  color: "#722F37",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  textShadow: "0 1px 6px rgba(255,253,248,0.6)",
                }}
              >
                Our Wedding Details
              </span>
            </div>
          </ImageContainer>
        </div>
      </section>

      <section
        id="wedding-details"
        className="bg-[url('/images/banner3cp.webp')] bg-cover bg-position-[1%_1%] bg-no-repeat"
      >
        <div className="relative pt-40">
          <div className="flex flex-col gap-8 pb-20">
            <div className="flex justify-center">
              <div className="relative">
                <img src="/images/ento1.webp" alt="" loading="lazy" className="w-80 shadow-xl" />
                <Sticker src="/STICKERS/36.webp" width={230} top="-90px" left="-95px" rotate={-12} zIndex={20} />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <img src="/images/ento2.webp" alt="" loading="lazy" className="w-80 shadow-xl" />
                <Sticker src="/STICKERS/23.webp" width={230} top="-155px" right="-95px" rotate={10} zIndex={20} />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <img src="/images/ento3.webp" alt="" loading="lazy" className="w-80 shadow-xl" />
                <Sticker src="/STICKERS/46.webp" width={200} top="-115px" left="-85px" rotate={-10} zIndex={20} />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <img src="/images/timeline.webp" alt="" loading="lazy" className="w-80 shadow-xl" />
                <Sticker src="/STICKERS/45.webp" width={230} top="-115px" right="-95px" rotate={10} zIndex={20} />
              </div>
            </div>
          </div>

          <ImageContainer
            className="absolute -bottom-34 object-cover"
            height={200}
          >
            <div
              style={{ position: "relative", height: "100%", width: "100%" }}
            >
              <img
                src="/images/scrapaper.webp"
                alt=""
                className="h-full w-full object-cover object-left"
              loading="lazy"
              />
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
                  color: "#722F37",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  textShadow: "0 1px 6px rgba(255,253,248,0.6)",
                }}
              >
                The Dress Code
              </span>
              <Sticker
                src="/STICKERS/26.webp"
                width={230}
                top="-135px"
                left="-45px"
                rotate={-10}
                zIndex={-1}
              />
            </div>
          </ImageContainer>
        </div>
      </section>

      <section
        id="dress-code"
        className="bg-[url('/images/banner5.webp')] bg-cover bg-no-repeat flex flex-col gap-20 pb-70 overflow-hidden"
      >
        <div className="relative flex flex-col gap-40">
          {/* LEFT — Parents of the Bride & Groom */}
          <div className="flex justify-start mt-50">
            <PolaroidCard
              image="/images/parents.webp"
              rotation={-5}
              selectedColor={color1}
              onColorSelect={setColor1}
              colors={["#6c3f2e", "#734f3d", "#826652"]}
              scrapPosition="outside-bottom"
              scrapWidth={300}
              scrapHeight={300}
              scrapRotation={12}
              scrapClassName="translate-y-40 -translate-x-45"
              scrapTextMaxWidth={250}
              scrapTextClassName="pl-10 text-start"
              tapeText="Parents of the Bride & Groom"
              scrapText={[
                "Men: Barong & black slacks",
                "Women: Brown or gray-brown gown",
              ]}
            />
          </div>

          {/* RIGHT — Principal Sponsors */}
          <div className="flex justify-end">
            <div className="relative">
              <PolaroidCard
                image="/images/dress-new.webp"
                rotation={5}
                selectedColor={color2}
                onColorSelect={setColor2}
                colors={["#f3e0c7", "#d8c1a5", "#b8a28e"]}
                scrapPosition="outside-bottom"
                scrapWidth={400}
                scrapHeight={300}
                scrapRotation={-20}
                scrapClassName="translate-y-40 -translate-x-50"
                scrapTextMaxWidth={300}
                scrapTextClassName="pl-10"
                tapeText="Principal Sponsors"
                scrapText={[
                  "Men: Barong & black slacks",
                  "Women: Light orange or pastel gown",
                ]}
              />
              <Sticker
                src="/STICKERS/27.webp"
                width={220}
                bottom="-55px"
                left="-82px"
                rotate={-10}
                zIndex={20}
              />
            </div>
          </div>

          {/* LEFT — Secondary Sponsors */}
          <div className="relative flex justify-start">
            <PolaroidCard
              image="/images/dress-new.webp"
              rotation={-4}
              selectedColor={color3}
              onColorSelect={setColor3}
              colors={["#808000"]}
              scrapPosition="outside-bottom"
              scrapWidth={300}
              scrapHeight={300}
              scrapRotation={-2}
              scrapClassName="translate-y-40 -translate-x-20"
              scrapTextMaxWidth={250}
              scrapTextClassName="pl-10 text-start"
              tapeText="Secondary Sponsors"
              scrapText={[
                "Men: Barong & black slacks",
                "Women: Dark olive gown",
              ]}
            />
          </div>

          {/* RIGHT — Guests */}
          <div className="flex justify-end">
            <div className="relative">
              <PolaroidCard
                image="/images/dress-new.webp"
                rotation={6}
                selectedColor={color4}
                onColorSelect={setColor4}
                colors={["#cdc1ba", "#8f8177", "#d1aba6", "#6f3b3e", "#a7a376", "#414224", "#c2a35a", "#844f39"]}
                scrapPosition="outside-left"
                scrapWidth={500}
                scrapHeight={300}
                scrapRotation={-12}
                scrapClassName="translate-y-14"
                scrapTextMaxWidth={350}
                scrapTextClassName="pl-10"
                tapeText="Guests"
                scrapText={[
                  "Men: Barong & black slacks",
                  "Women: Dress in preferred color",
                ]}
              />
              <Sticker
                src="/STICKERS/22.webp"
                width={230}
                top="-155px"
                right="172px"
                rotate={10}
                zIndex={0}
              />
            </div>
          </div>

          {/* LEFT — Guests */}
          {/* <div className="flex justify-start">
            <PolaroidCard
              image="/images/dress-new.webp"
              rotation={-5}
              selectedColor={color5}
              onColorSelect={setColor5}
              colors={["#cdc1ba", "#8f8177", "#c2a35a", "#6f3b3e"]}
              scrapPosition="outside-bottom"
              scrapWidth={300}
              scrapHeight={300}
              scrapRotation={12}
              scrapClassName="translate-y-40 -translate-x-45"
              scrapTextMaxWidth={250}
              scrapTextClassName="pl-10 text-start"
              tapeText="Guests"
              scrapText={[
                "Smart casual to formal",
                "Avoid white & black",
                "Muted & warm tones",
              ]}
            />
          </div> */}
        </div>
      </section>

      <section>
        <div className="relative">
          <ImageContainer
            className="absolute -top-34 object-cover"
            height={200}
          >
            <div
              style={{ position: "relative", height: "100%", width: "100%" }}
            >
              <img
                src="/images/scrapaper.webp"
                alt=""
                className="h-full w-full object-cover object-left"
              loading="lazy"
              />
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
                  color: "#722F37",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  textShadow: "0 1px 6px rgba(255,253,248,0.6)",
                }}
              >
                Frequently Asked Questions
              </span>
            </div>
          </ImageContainer>
        </div>
      </section>

      <section
        id="faqs"
        className="bg-[url('/images/banner4.webp')] bg-cover bg-position-[1%_1%] bg-no-repeat"
      >
        <div className="relative pt-20 overflow-y-hidden">
          <div className="flex flex-col gap-8 pb-20 px-5">
            <ScrapbookFAQ></ScrapbookFAQ>
          </div>
          <Sticker
            src="/STICKERS/33.webp" // ← your actual sticker PNG
            width={320} // size in px
            bottom="-110px" // hang it above the section edge
            right="-82px" // distance from right
            rotate={18} // tilt
            zIndex={10} // above content
          />
        </div>
      </section>

      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
      <StickyControls onOpenRSVP={() => setIsRSVPOpen(true)} />
    </>
  );
}

export default Home;