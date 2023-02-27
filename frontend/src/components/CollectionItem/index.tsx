import { FC } from 'react';

import { IItem } from '../../types/item';
import { trim } from '../../utils/trimmer';
import { RowItem, RowWrapper, StyledLink } from '../CurrentCollection/styled';

interface IProps {
  item: IItem;
  additionalFields: Record<string, string[]>;
  collectionId: number;
  userId: number;
}

export const CollectionItem: FC<IProps> = ({ item, additionalFields, collectionId, userId }) => {
  const fields = Object.values(additionalFields).flat(1);
  return (
    <StyledLink to={`/collection/${collectionId}/${item.id}`} state={{ userId }}>
      <RowWrapper>
        <RowItem>{item.id}</RowItem>
        <RowItem>{trim(item.name)}</RowItem>
        {fields.map(field => {
          const value = item[field as keyof Omit<IItem, 'tags'>];

          if (typeof value === 'string') {
            const date = new Date(value);
            if (date.toString() !== 'Invalid Date') {
              return <RowItem key={field}>{date.toLocaleDateString()}</RowItem>;
            }
          } else if (typeof value === 'boolean') {
            return <RowItem key={field}>{value ? 'true' : 'false'}</RowItem>;
          }

          return <RowItem key={field}>{trim(value)}</RowItem>;
        })}
        <RowItem>{item.tags.map(tag => tag.tag).join(', ')}</RowItem>
      </RowWrapper>
    </StyledLink>
  );
};
