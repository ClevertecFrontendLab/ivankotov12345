import { Typography } from 'antd';

const {Text} = Typography;

type HighlightTextProps = {
    name: string,
    searchValue: string,
}

export const HighlightText: React.FC<HighlightTextProps> = ({ name, searchValue }) => {
  const highlightedText = [];

  for (let i = 0; i < name.length; i++) {
      if (searchValue.includes(name[i])) {
          highlightedText.push(<Text style={{color: 'red'}}>{name[i]}</Text>);
      } else {
          highlightedText.push(name[i]);
      }
  }

  return <Text>{highlightedText}</Text>;
  }