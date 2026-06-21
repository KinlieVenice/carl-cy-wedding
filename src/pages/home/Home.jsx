import { useState, useEffect } from "react";
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
import RSVPModal from "../../components/RSVPModal";
import StickyControls from "../../components/StickyControls";
import Sticker from "../../components/Sticker";

function Home () {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [AH, setAH] = useState(() => window.innerHeight - 88);

  useEffect(() => {
    const handler = () => setAH(window.innerHeight - 88);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  const [color1, setColor1] = useState("#6c3f2e");
  const [color2, setColor2] = useState("#f3e0c7");
  const [color3, setColor3] = useState("#808000");
  const [color4, setColor4] = useState("#722F37");
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
        className="bg-[url('/images/banner_bg_sm.webp')] bg-cover bg-no-repeat bg-position-[55%_55%] h-[80svh]"
      >
        <div className="relative flex flex-col items-center pt-4 justify-start h-full">
          <ImageContainer height={Math.round(AH * (AH < 412 ? 0.37 : AH < 532 ? 0.32 : AH < 662 ? 0.33 : 0.31))} rotation={-4}>
            <img
              src="/images/banner_inv.webp"
              alt=""
              className="h-full object-cover"
              fetchpriority="high"
              loading="eager"
            />
          </ImageContainer>
          <ImageContainer height={Math.round(AH * (AH < 412 ? 0.32 : AH < 532 ? 0.32 : AH < 662 ? 0.29 : 0.28))} rotation={1}>
            <img
              src="/images/banner_pic.webp"
              alt=""
              className="h-full object-cover"
              fetchpriority="high"
              loading="eager"
            />
          </ImageContainer>
          <Countdown targetDate="2026-11-26T00:00:00" ah={AH} />
          <ImageContainer
            className="absolute -bottom-35 z-10 object-cover"
            height={170}
          >
            <div
              style={{ position: "relative", height: "100%", width: "100%" }}
            >
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
          <ImageContainer className="mt-25">
            <img
              src="/images/bride-cy.webp"
              alt=""
              className="h-full w-full object-cover"
              loading=""
            />
          </ImageContainer>
          <ImageContainer
            className="absolute -bottom-17 z-10 object-cover"
            height={100}
          >
            <img
              src="/images/scrapaper.webp"
              alt=""
              className="h-full w-full object-cover object-left"
            />
          </ImageContainer>
        </div>
        <div className="relative">
          <ImageContainer className="relative z-20">
            <img
              src="/images/groom-carl.webp"
              alt=""
              className="h-full w-full object-cover"
              loading=""
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

      <section className="bg-[url('/images/story-bg-sm.webp')] bg-cover bg-position-[1%_1%] bg-no-repeat h-[95svh] mt-26">
        <div className="flex items-start justify-center h-full px-4 pt-[8vh]">
          <BookHalfSlider />
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
            />
          </ImageContainer>
        </div>
      </section>

      <section
        id="wedding-overview"
        className="bg-[url('/images/banner2.webp')] bg-cover bg-center bg-no-repeat"
      >
        <div className="relative pb-10 flex flex-col items-center">
          <div className="flex flex-col items-center gap-10">
            <ImageContainer>
              <img src="/images/wed-deets.webp" alt="" loading="" />
            </ImageContainer>
            <div className="flex flex-col items-center gap-5 pb-15 px-8">
              <ImageContainer>
                <img src="/images/chapel-h.webp" alt="" loading="" />
              </ImageContainer>
              <ImageContainer>
                <img src="/images/windsong-t.webp" alt="" loading="" />
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
        className="bg-[url('/images/banner3.webp')] bg-cover bg-position-[1%_1%] bg-no-repeat"
      >
        <div className="relative pt-40">
          <div className="flex flex-col gap-8 pb-20 px-12">
            <ImageContainer className="shadow-xl">
              <img src="/images/ento1.webp" alt="" loading="" />
            </ImageContainer>
            <ImageContainer className="shadow-xl">
              <img src="/images/ento2.webp" alt="" loading="" />
            </ImageContainer>
            <ImageContainer className="shadow-xl">
              <img src="/images/ento3.webp" alt="" loading="" />
            </ImageContainer>
            <ImageContainer className="shadow-xl">
              <img src="/images/timeline.webp" alt="" loading="" />
            </ImageContainer>
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
            </div>
          </ImageContainer>
        </div>
      </section>

      <section
        id="dress-code"
        className="bg-[url('/images/banner4.webp')] bg-cover bg-no-repeat flex flex-col gap-20 pb-70 overflow-hidden"
      >
        <div className="relative flex flex-col gap-40">
          {/* LEFT — Parents of the Bride & Groom */}
          <div className="flex justify-start mt-50">
            <PolaroidCard
              image="/images/dress-new.webp"
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
                "Semi-formal attire",
                "Earth tones preferred",
                "Avoid white outfits",
              ]}
            />
          </div>

          {/* RIGHT — Principal Sponsors */}
          <div className="flex justify-end">
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
                "Formal / black-tie attire",
                "Soft pastels & neutrals",
                "Elegant floor-length gowns",
              ]}
            />
          </div>

          {/* LEFT — Secondary Sponsors */}
          <div className="flex justify-start">
            <PolaroidCard
              image="/images/dress-new.webp"
              rotation={-4}
              selectedColor={color3}
              onColorSelect={setColor3}
              colors={["#808000", "#6B7041", "#9a9c52"]}
              scrapPosition="outside-bottom"
              scrapWidth={300}
              scrapHeight={300}
              scrapRotation={-2}
              scrapClassName="translate-y-40 -translate-x-20"
              scrapTextMaxWidth={250}
              scrapTextClassName="pl-10 text-start"
              tapeText="Secondary Sponsors"
              scrapText={[
                "Semi-formal attire",
                "Olive & sage tones",
                "Coordinate with partners",
              ]}
            />
          </div>

          {/* RIGHT — Guests */}
          <div className="flex justify-end">
            <PolaroidCard
              image="/images/dress-new.webp"
              rotation={6}
              selectedColor={color4}
              onColorSelect={setColor4}
              colors={["#722F37", "#8c4a50", "#c9a09c"]}
              scrapPosition="outside-left"
              scrapWidth={500}
              scrapHeight={300}
              scrapRotation={-12}
              scrapClassName="translate-y-14"
              scrapTextMaxWidth={350}
              scrapTextClassName="pl-10"
              tapeText="Guests"
              scrapText={[
                "Assigned colors per role",
                "Formal attire required",
                "Coordinate with the couple",
              ]}
            />
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
        className="bg-[url('/images/banner5.webp')] bg-cover bg-position-[1%_1%] bg-no-repeat"
      >
        <div className="relative pt-20">
          <div className="flex flex-col gap-8 pb-20 px-5">
            <ScrapbookFAQ></ScrapbookFAQ>
          </div>
          <Sticker
            src="/STICKERS/32.webp" // ← your actual sticker PNG
            width={90} // size in px
            top="-30px" // hang it above the section edge
            right="12px" // distance from right
            rotate={18} // tilt
            zIndex={30} // above content
          />
        </div>
      </section>

      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
      <StickyControls onOpenRSVP={() => setIsRSVPOpen(true)} />
    </>
  );
}

export default Home;