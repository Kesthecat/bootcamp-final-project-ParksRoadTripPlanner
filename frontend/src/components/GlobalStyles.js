import { createGlobalStyle } from "styled-components";

//  /////  //color themes
/////////////bright blue hue + yellow + orange
//            //115, 191, 184 //green sheen
//            //254, 198, 1 //mikado yellow
//            //234, 115, 23 //princeton orange

/////////////black, gray, light blue hue and yellow
//            //207, 219, 213 //gainsboro (gray sky blue)
//            //232, 237, 223 //alabaster (bluish gray)
//            //245, 203, 92 //maize croyola
//            //245, 203, 61 //saffron
//            //35, 100, 170 //green blue (light navy)
//            //rgb(61, 165, 217) //carolina blue (navy turquoise)
//            //36, 36, 35 //eerie black
//            //51, 53, 51 //jet
//            //36, 47, 64 //gunmetal

export default createGlobalStyle`
  :root {
    --color-main: rgba(245, 203, 92); //maize croyola
    --color-secondary: 	rgba(207, 219, 213); //gainsboro (gray sky blue)
    --color-tertiary: rgba(232, 237, 223); //alabaster (bluish gray)
    --color-marker: rgba(234, 115, 23); //princeton orange
    --color-text: rgba(36, 36, 35); //eerie black)
    --color-text-hover: rgba(84, 105, 133, 1); 
    --font-logo: 'Arvo', serif;
    --font-heading: 'Crete Round', serif;
    /* --font-subheading: 'Poppins', Arial, Helvetica, sans-serif; */
    --font-body: 'Rubik', sans-serif;
  }

  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }

  //additional resets
  a {
      text-decoration: none;
      cursor: pointer;
      color: var(--color-text);

      &:hover {
          color: var(--color-text-hover);
          transform: scale(1.1);
      }

  }
  button {
      border: none;
      color: var(--color-text);
      background-color: var(--color-main);
      cursor: pointer;
      border-radius: 5px;
      transition: 0.1s ease-in-out;
      font-family:var(--font-body);
    
      &:hover {
        transform: scale(1.05);
    }
  }

  h1, h2 {
    font-family: var(--font-heading);
}
h3, h4, h5 {
    font-family: var(--font-heading);
}

p, span, a {
    font-family: var(--font-body);
}

h1 {
    font-size: 50px;
    font-weight: bold;
    color: var(--color-text);
}

h2 {
    font-size:35px;
}

h3 { 
    font-size: 26px;
}

h4 { 
    font-size: 22px;
}

p, a {
    font-size: 20px;
}

`;
