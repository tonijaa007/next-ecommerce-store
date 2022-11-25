import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const bannerStyles = (isOpen) => css`
  transition: all 0.5s ease-in-out;

  ${!isOpen &&
  css`
    height: 0;
    padding: 0;
    overflow: hidden;
  `};
`;

export default function CookieBanner() {
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  useEffect(() => {
    const initialValue = getLocalStorage('isBannerOpen');

    if (initialValue !== null) {
      setIsBannerOpen(initialValue);
    }
  }, []);

  return (
    <div css={bannerStyles(isBannerOpen)}>
      <span>Please accept our cookie policy</span>
      {JSON.stringify(isBannerOpen)}{' '}
      <button
        onClick={() => {
          setIsBannerOpen(false);
          setLocalStorage('isBannerOpen', false);
        }}
      >
        Yes
      </button>
    </div>
  );
}
