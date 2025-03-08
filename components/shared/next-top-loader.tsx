'use client';

import NextTopLoader from 'nextjs-toploader';

const NextTopLoaderProvider = () => {
    return (
        <NextTopLoader
            color='#000000'
            initialPosition={0.08}
            crawlSpeed={200}
            height={4}
            crawl={true}
            showSpinner={false}
            easing='ease'
            speed={200}
            shadow='0 0 10px #16A34A,0 0 5px #16A34A'
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
        />
    );
};

export default NextTopLoaderProvider;
