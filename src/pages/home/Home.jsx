import ImageContainer from "../../components/ImageContainer";
import Countdown from "../../components/Countdown";


function Home () {
    return (
      <>
        <section className="bg-[url('/images/banner_bg.jpg')] bg-cover bg-position-[55%_55%] bg-no-repeat h-[90dvh]">
          <div className="flex flex-col items-center justify-center h-full">
            <ImageContainer height={150} rotation={-4}>
              <img
                src="/images/banner_inv.png"
                alt=""
                className="h-full object-cover"
              />
            </ImageContainer>
            <ImageContainer height={150} rotation={1}>
              <img
                src="/images/banner_pic.png"
                alt=""
                className="h-full object-cover"
              />
            </ImageContainer>
            <Countdown targetDate="2026-11-26T00:00:00" />
          </div>
        </section>
        <section className="-mt-6 relative z-10">
          <ImageContainer height={100}>
            <img src="/images/scrapaper.png" alt="" />
          </ImageContainer>
        </section>
      </>
    );
}

export default Home;