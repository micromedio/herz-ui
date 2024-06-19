/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProviderProps,
} from 'react-live';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import useIsBrowser from '@docusaurus/useIsBrowser';
import usePrismTheme from '@theme/hooks/usePrismTheme';
import styles from './styles.module.css';
import { Button } from '@micromed/herz-ui';

function Header({ children }: { children: React.ReactNode }) {
  return <div className={clsx(styles.playgroundHeader)}>{children}</div>;
}

function ResultWithHeader() {
  return (
    <>
      <Header>
        <Translate
          id="theme.Playground.result"
          description="The result label of the live codeblocks"
        >
          Result
        </Translate>
      </Header>
      <div className={styles.playgroundPreview}>
        <LivePreview />
        <LiveError />
      </div>
    </>
  );
}

function EditorWithHeader() {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Header>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Translate
            id="theme.Playground.liveEditor"
            description="The live editor label of the live codeblocks"
          >
            Live Editor
          </Translate>

          <Button
            size="small"
            variant="plain"
            onClick={() => setShow((value) => !value)}
            color="secondary"
            iconName={show ? 'IconChevronUp' : 'IconChevronDown'}
          >
            {show ? 'Hide' : 'Show'}
          </Button>
        </div>
      </Header>
      <LiveEditor
        className={styles.playgroundEditor}
        style={{
          display: show ? 'block' : 'none',
        }}
      />
    </>
  );
}

export default function Playground({
  children,
  transformCode,
  ...properties
}: { children: string } & Omit<LiveProviderProps, 'children' | 'ref'>) {
  const isBrowser = useIsBrowser();
  const prismTheme = usePrismTheme();

  return (
    <div className={styles.playgroundContainer}>
      <LiveProvider
        key={isBrowser.toString()}
        code={isBrowser ? children.replace(/\n$/, '') : ''}
        transformCode={transformCode || ((code) => `${code};`)}
        theme={prismTheme}
        {...properties}
      >
        <EditorWithHeader />
        <ResultWithHeader />
      </LiveProvider>
    </div>
  );
}
