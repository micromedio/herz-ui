import '@testing-library/jest-dom';
import React, { useState } from 'react';
import { fireEvent, render } from '../../tests/utils';

import Uploader, { UploaderProps } from './Uploader';

const DefaultTemplate = (props: UploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Uploader
      {...props}
      files={files}
      onChange={(files) => setFiles(files)}
      showFiles
    >
      {props.children}
    </Uploader>
  );
};

describe('Uploader', () => {
  it('can accept a dropped file and also remove files', async () => {
    const mockedFunction = jest.fn();
    const { getByTitle, getAllByTitle, findByText } = render(
      <DefaultTemplate name="test" onChange={mockedFunction}>
        Drag & Drop or browse a file
      </DefaultTemplate>
    );

    const uploadInput = getByTitle('Drag & Drop or browse a file');

    /** Mock a file drop */
    window.URL.createObjectURL = jest.fn().mockImplementation(() => 'url');
    const file = new File(['file'], 'example.png', {
      type: 'image/png',
    });
    Object.defineProperty(uploadInput, 'files', {
      value: [file],
    });
    fireEvent.drop(uploadInput);

    /** Expect to find the added file */
    expect(await findByText('example.png')).toBeInTheDocument();

    /** Expect to be able to remove it */
    const removeButton = getAllByTitle('Remove file');
    fireEvent.click(removeButton[0]);
  });
});
