import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { WithContext as ReactTags } from 'react-tag-input';

import { useAppSelector } from '../../redux/hooks';
import { IFieldTag } from '../../types/base';

import './styles.css';

interface IProps {
  tags: IFieldTag[];
  setTags: Dispatch<SetStateAction<IFieldTag[]>>;
  suggestion: IFieldTag[];
}

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const TagsField: FC<IProps> = ({ tags, setTags, suggestion }) => {
  const { theme } = useAppSelector(state => state.user);
  const { t } = useTranslation();

  const handleDeleteTag = (index: number) => {
    setTags(prev => prev.filter((el, i) => i !== index));
  };
  const handleAddTag = (tag: IFieldTag) => {
    setTags(prev => [...prev, tag]);
  };

  return (
    <ReactTags
      tags={tags}
      suggestions={suggestion}
      delimiters={delimiters}
      handleDelete={handleDeleteTag}
      handleAddition={handleAddTag}
      inputFieldPosition="top"
      autocomplete
      allowUnique
      allowDragDrop={false}
      autofocus={false}
      classNames={{
        tagInputField:
          theme === 'dark' ? 'ReactTags__tagInputField dark' : 'ReactTags__tagInputField light',
      }}
      placeholder={t('placeholder.tags') || ''}
    />
  );
};
