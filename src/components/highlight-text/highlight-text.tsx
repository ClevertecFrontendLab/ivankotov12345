import { Fragment } from 'react';
import { Typography } from 'antd';

const {Text} = Typography;

type HighlightTextProps = {
    name: string,
    searchValue: string,
}

export const HighlightText: React.FC<HighlightTextProps> = ({ name, searchValue }) => {
  const highlightedText = [];
  let foundSpace = false;

  for (let i = 0; i < name.length; i++) {
      if (name[i] === ' ' && !foundSpace) {
          highlightedText.push(
          <Fragment>
            <Text>{name[i]}</Text>
            <br />
          </Fragment>);
          foundSpace = true;
      } else if (searchValue.includes(name[i])) {
          highlightedText.push(<Text type='danger'>{name[i]}</Text>);
      } else {
          highlightedText.push(<Text>{name[i]}</Text>);
      }
  }

  return <Text>
           {highlightedText}
        </Text>;
}