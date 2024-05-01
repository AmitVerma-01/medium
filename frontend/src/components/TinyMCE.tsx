import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  initialValue: string;
  onChange: (content: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  initialValue,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (content: string) => {
    setValue(content);
    onChange(content);
  };

  return <ReactQuill theme="snow" value={value} onChange={handleChange} />;
};

export default QuillEditor;
