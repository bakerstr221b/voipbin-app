import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

/*여기서부터는 팀룰에 따라 자유롭게 커스텀 

  * {
    box-sizing: border-box;
  }

  html, body { 
    width: 100%;
    height: 100%;
    min-width: 1200px;
    background-color: #ffffff;
    font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI;
    font-size : 16px;
    color: rgb(58, 58, 58);
  }

  ul, ol {
    list-style: none;
  }

*/

`;