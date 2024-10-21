import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  background-color: ${(props) => props.$bgColor || '#FF8227'};
  color: ${(props) => props.$textColor || 'white'};
  border: ${(props) => props.$border || '2px solid #FF8227'};
  border-radius: ${(props) => props.$borderRadius || '8px'};
  padding: ${(props) => props.$padding || '12px'};
  font-size: ${(props) => props.$fontSize || '18px'};
  font-family: ${(props) => props.$fontFamily || "'Exo 2', sans-serif"};
  cursor: pointer;
  width: ${(props) => props.$width || 'auto'};

  &:hover {
    background-color: #F93326;
    border: 2px solid #F93326;
  }
`;

const Button = ({ text, bgColor, textColor, border, borderRadius, padding, fontSize, fontFamily, width, onClick }) => {
    return (
      <StyledButton
        $bgColor={bgColor}
        $textColor={textColor}
        $border={border}
        $borderRadius={borderRadius}
        $padding={padding}
        $fontSize={fontSize}
        $fontFamily={fontFamily}
        $width={width}
        onClick={onClick}
      >
        {text}
      </StyledButton>
    );
  };
  
  Button.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    border: PropTypes.string,
    borderRadius: PropTypes.string,
    padding: PropTypes.string,
    fontSize: PropTypes.string,
    fontFamily: PropTypes.string,
    width: PropTypes.string,
    onClick: PropTypes.func,
  };
  
  export default Button;