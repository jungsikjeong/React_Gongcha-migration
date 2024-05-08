import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: none;
  min-height: 168px;
  max-height: 168px;
  outline: none;
`;

const Placeholder = styled.div`
  padding-top: 2rem;
  color: #999;
`;

const Output = styled.div`
  padding-top: 2rem;
  text-align: left;
  width: 100%;
  height: auto;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: visible;
  box-sizing: border-box;
`;

const Input = styled.div`
  padding-top: 2rem;
  text-align: left;
  width: 100%;
  height: auto;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: visible;
  border: none;
  outline: none;
  box-sizing: border-box;
  z-index: 1;
`;

interface IEditorProps {
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const Editor = ({
  placeholder,
  value,
  setValue,
  tags,
  setTags,
}: IEditorProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      putAtCaret(' \n<br>\u200B');

      return false;
    }
  };

  const putAtCaret = (content: string) => {
    const selection = window.getSelection();

    if (selection && selection.getRangeAt && selection.rangeCount) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const el = document.createElement('div');
      el.innerHTML = content;
      const frag = document.createDocumentFragment();
      let node;
      let lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
      if (lastNode) {
        const newRange = range.cloneRange();
        newRange.setStartAfter(lastNode);
        newRange.setEndAfter(lastNode);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  };

  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const hashTags = e.currentTarget.innerText.match(/#[^\s#]+/g);
    const str = e.currentTarget.innerText
      .replace(/(<)/gi, '&lt;')
      .replace(/(<)/gi, '&lg;')
      .replace(/(?:\r\n|\n\r|\r|\n)/g, '\n<br />')
      .replace(/#(.+?)(?=[\s.,:,]|$)/g, "<span class='hashtag'>#$1</span>")
      .replace(/@(.+?)(?=[\s.,:,]|$)/g, "<span class='mention'>@$1</span>")
      .replace(
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/g,
        '<span>$1</span>'
      );

    if (hashTags) {
      setTags(hashTags);
    }

    setValue(str);
  };

  return (
    <Container>
      {placeholder && !value && (
        <Placeholder
          dangerouslySetInnerHTML={{ __html: placeholder }}
        ></Placeholder>
      )}

      <Output dangerouslySetInnerHTML={{ __html: value }}></Output>
      <Input
        contentEditable={true}
        onKeyDown={handleKeyDown}
        onInput={(e) => handleChange(e)}
      ></Input>
    </Container>
  );
};

export default Editor;
