import {
  DirecotryItemContainer,
  BackgroundImage,
  Body,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { id, imageUrl, title } = category;
  return (
    <DirecotryItemContainer key={id}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Show Now</p>
      </Body>
    </DirecotryItemContainer>
  );
};

export default DirectoryItem;
