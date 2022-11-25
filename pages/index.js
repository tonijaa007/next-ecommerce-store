import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const mainStyles = css``;
const heading = css`
  text-align: center;
`;
const videoContainerStyles = css`
  text-align: center;
`;
const wallpaperContainer = css`
  position: relative;
  text-align: center;
`;
const imageStyle = css`
  height: 100%;
`;
const wallpaperText = css`
  color: white;
  font-size: 25px;
  font-weight: bold;
  position: absolute;
  top: 25%;
  left: 25%;
  width: 700px;
  margin: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  line-height: 1.5;
`;
export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="E-commerce store by next app" />
      </Head>
      <main css={mainStyles}>
        <h1 css={heading}>Become a magician in your town</h1>
        {/* <Image
          src="/Piggy Lighter.webp"
          alt="lighter in a pink pig design"
          width={500}
          height={500}
        /> */}
        <div css={videoContainerStyles}>
          <video autoPlay loop controls>
            <source src="/fireball-stick_.mp4" />
            <track
              src="captions_en.vtt"
              kind="captions"
              label="english_captions"
            />
          </video>
        </div>
        <br />
        <br />
        <div css={wallpaperContainer}>
          <img
            css={imageStyle}
            src="/Harry Potter Wallpaper.jpg"
            alt="Harry Potter Wallpaper"
          />
          <div css={wallpaperText}>
            Harry Potter fans can finally live their dream of having a wand by
            purchasing the Fire Ball Stick Wand from Ashura. The wand shoots
            fireballs, making it a fun toy for outdoor play and during
            Halloween. This wand is made of two pieces -- a wand and a base. To
            use, simply insert little balls into the opening at the base, plug
            in the included power cord, then point and shoot as many fireballs
            as you desire!
          </div>
        </div>

        {/* <img src="/Piggy Lighter.webp" alt="lighter in a pink pig design" /> */}
      </main>
    </>
  );
}
